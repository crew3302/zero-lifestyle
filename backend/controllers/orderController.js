// controllers/orderController.js
const dbPool = require('../config/db'); // dbPool is the MySQL pool

const createOrder = async (req, res) => {
  const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount } = req.body;

  if (!customerName || !customerEmail || !shippingAddress || !items || !Array.isArray(items) || items.length === 0 || typeof totalAmount === 'undefined') {
    return res.status(400).json({ msg: 'Missing required order details or items.' });
  }

  let connection; // Declare connection outside try to use in finally
  try {
    connection = await dbPool.getConnection(); // Get a connection from the pool for transaction
    await connection.beginTransaction();

    const orderInsertQuery = `
      INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, total_amount, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    // MySQL's INSERT...RETURNING is not standard like PostgreSQL. We get insertId.
    const orderValues = [customerName, customerEmail, customerPhone || null, shippingAddress, totalAmount, 'Pending'];
    const [orderResult] = await connection.execute(orderInsertQuery, orderValues);
    const newOrderId = orderResult.insertId;

    if (!newOrderId) {
        throw new Error("Failed to create order record or retrieve order ID.");
    }

    // Fetch the newly created order to get all its details including defaults like order_date
    const [newOrderRows] = await connection.execute('SELECT * FROM orders WHERE order_id = ?', [newOrderId]);
    if (newOrderRows.length === 0) {
        throw new Error("Failed to retrieve newly created order.");
    }
    const newOrder = newOrderRows[0];


    const orderItemInsertQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name, product_image_url)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    for (const item of items) {
      if (!item.id || typeof item.quantity !== 'number' || item.quantity <= 0 || typeof item.priceAtPurchase !== 'number') {
          console.error("Invalid item data:", item);
          throw new Error('Invalid item data received. Each item must have a valid id, quantity, and priceAtPurchase.');
      }
      const itemValues = [
        newOrderId,
        item.id,
        item.quantity,
        item.priceAtPurchase,
        item.name || 'N/A', // Provide default if name is missing
        item.imageUrl || 'N/A' // Provide default if imageUrl is missing
      ];
      await connection.execute(orderItemInsertQuery, itemValues);
    }

    await connection.commit();
    res.status(201).json({
      message: 'Order created successfully!',
      order: { // Construct the relevant parts of the order object for the response
        order_id: newOrder.order_id,
        order_date: newOrder.order_date, // This will be from the DB
        status: newOrder.status,
        // total_amount: newOrder.total_amount // also available
      }
    });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error('Error creating order:', err.message, err.stack); // Log the full stack trace
    // Send a more specific error message if possible, otherwise a generic one
    res.status(500).json({ msg: 'Server error while creating order.', error: err.message });
  } finally {
    if (connection) connection.release();
  }
};

const getAllOrders = async (req, res) => {
    try {
        // MySQL's json_agg and json_build_object are different or not directly available.
        // A common approach is to fetch orders and then items separately or use a more complex JOIN and group in app code.
        // For simplicity, let's fetch orders and then iterate to get items (can be N+1 query issue for large scale).
        const [orders] = await dbPool.execute(
            `SELECT order_id, customer_name, customer_email, total_amount, status, order_date 
             FROM orders 
             ORDER BY order_date DESC`
        );

        if (orders.length === 0) {
            return res.json([]);
        }

        const ordersWithItems = [];
        for (const order of orders) {
            const [items] = await dbPool.execute(
                `SELECT product_id, product_name, quantity, price_at_purchase 
                 FROM order_items 
                 WHERE order_id = ?`,
                [order.order_id]
            );
            ordersWithItems.push({ ...order, items });
        }
        res.json(ordersWithItems);
    } catch (err) {
        console.error('Error fetching orders:', err.message, err.stack);
        res.status(500).json({ msg: 'Server Error fetching orders', error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const orderSql = 'SELECT * FROM orders WHERE order_id = ?';
        const [orderRows] = await dbPool.execute(orderSql, [orderId]);

        if (orderRows.length === 0) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        const itemsSql = 'SELECT product_id, product_name, product_image_url, quantity, price_at_purchase FROM order_items WHERE order_id = ?';
        const [itemRows] = await dbPool.execute(itemsSql, [orderId]);

        const order = orderRows[0];
        order.items = itemRows;

        res.json(order);
    } catch (err) {
        console.error('Error fetching order by ID:', err.message, err.stack);
        res.status(500).json({ msg: 'Server Error fetching order', error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ msg: 'Status is required.' });
        }

        const updateSql = 'UPDATE orders SET status = ? WHERE order_id = ?';
        const [result] = await dbPool.execute(updateSql, [status, orderId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Order not found or status not updated.' });
        }
        
        // Fetch the updated order to return it
        const [updatedOrderRows] = await dbPool.execute('SELECT * FROM orders WHERE order_id = ?', [orderId]);
        res.json({ msg: 'Order status updated successfully', order: updatedOrderRows[0] });
    } catch (err) {
        console.error('Error updating order status:', err.message, err.stack);
        res.status(500).json({ msg: 'Server Error updating order status', error: err.message });
    }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};