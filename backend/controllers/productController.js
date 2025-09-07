// controllers/productController.js
const dbPool = require('../config/db'); // dbPool is the MySQL pool

// Get all products or filter by category or sub_category
const getAllProducts = async (req, res) => {
  try {
    let sql = 'SELECT * FROM products';
    const queryParams = [];
    const conditions = [];

    if (req.query.category) {
      conditions.push('LOWER(category) = LOWER(?)');
      queryParams.push(req.query.category);
    }

    if (req.query.sub_category) {
      conditions.push('LOWER(sub_category) = LOWER(?)');
      queryParams.push(req.query.sub_category);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    sql += ' ORDER BY created_at DESC';

    const [rows] = await dbPool.execute(sql, queryParams);
    res.json(rows);
  } catch (err) {
    console.error('Error in getAllProducts:', err.message, err.stack);
    res.status(500).json({ msg: 'Server error fetching products', error: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await dbPool.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error in getProductById:', err.message, err.stack);
    res.status(500).json({ msg: 'Server error fetching product', error: err.message });
  }
};

// Get products by sub-category
const getProductsBySubCategory = async (req, res) => {
    try {
        const { subCategoryName } = req.params;
        const sql = 'SELECT * FROM products WHERE LOWER(sub_category) = LOWER(?) ORDER BY created_at DESC';
        const [rows] = await dbPool.execute(sql, [subCategoryName]);
        res.json(rows);
    } catch (err) {
        console.error('Error in getProductsBySubCategory:', err.message, err.stack);
        res.status(500).json({ msg: 'Server Error fetching products by sub-category', error: err.message });
    }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsBySubCategory,
};