const Product = require('../models/Product');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      success: true,
      message: 'Products retrieved successfully',
      object: products,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      object: null,
      errors: [error.message],
    });
  }
};

// Get a single product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        object: null,
        errors: ['Not found'],
      });
    }
    res.json({
      success: true,
      message: 'Product retrieved successfully',
      object: product,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      object: null,
      errors: [error.message],
    });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required',
        object: null,
        errors: ['Missing required fields'],
      });
    }

    const product = await Product.create({ name, description, price });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      object: product,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      object: null,
      errors: [error.message],
    });
  }
};

// Update a product by id
const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        object: null,
        errors: ['Not found'],
      });
    }

    await product.update({ name, description, price });

    res.json({
      success: true,
      message: 'Product updated successfully',
      object: product,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      object: null,
      errors: [error.message],
    });
  }
};

// Delete a product by id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        object: null,
        errors: ['Not found'],
      });
    }

    await product.destroy();

    res.json({
      success: true,
      message: 'Product deleted successfully',
      object: null,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      object: null,
      errors: [error.message],
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
