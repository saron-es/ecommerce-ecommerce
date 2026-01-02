const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// Create a product
router.post('/products', createProduct);

// Get all products
router.get('/products', getAllProducts);

// Get a single product by id
router.get('/products/:id', getProductById);

// Update a product by id
router.put('/products/:id', updateProduct);

// Delete a product by id
router.delete('/products/:id', deleteProduct);

module.exports = router;
