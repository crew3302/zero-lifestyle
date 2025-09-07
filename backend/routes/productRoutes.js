// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsBySubCategory
} = require('../controllers/productController');

// @route   GET api/products
// @desc    Get all products (can be filtered by ?category= or ?sub_category=)
// @access  Public
router.get('/', getAllProducts);

// @route   GET api/products/sub/:subCategoryName
// @desc    Get products by sub-category (e.g. hot, new, latest)
// @access  Public
router.get('/sub/:subCategoryName', getProductsBySubCategory);


// @route   GET api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProductById);


module.exports = router;