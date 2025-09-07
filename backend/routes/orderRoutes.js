// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

// @route   POST api/orders
// @desc    Create a new order
// @access  Public (as no auth)
router.post('/', createOrder);

// @route   GET api/orders
// @desc    Get all orders (typically admin)
// @access  Public (as no auth - in real app, protect this)
router.get('/', getAllOrders);

// @route   GET api/orders/:orderId
// @desc    Get a single order by its ID
// @access  Public
router.get('/:orderId', getOrderById);

// @route   PUT api/orders/:orderId/status
// @desc    Update order status (typically admin)
// @access  Public (as no auth - in real app, protect this)
router.put('/:orderId/status', updateOrderStatus);


module.exports = router;