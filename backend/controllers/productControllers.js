const Product = require('../models/productModels'); // Import the Product model
const { check, validationResult } = require('express-validator');

// Product controller
const productController = {
  // Create a product
  createProduct: async (req, res) => {
    const errors = validationResult(req); // Check for validation errors

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProduct = new Product(req.body); // Create a new product instance

    try {
      await newProduct.save(); // Save the product to the database
      res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear producto', error });
    }
  },

  // Get all products (with pagination)
  getProducts: async (req, res) => {
    const options = {
      page: parseInt(req.query.page) || 1, // Get page number from query or set default to 1
      limit: parseInt(req.query.limit) || 10, // Get limit from query or set default to 10
      sort: { creationDate: -1 }, // Sort by creation date descending
      populate: 'category' // Populate the 'category' field
    };

    /*
      Crear un filtro que permita buscar productos por nombre
      Crear un filtro que permtia buscar productos por categoria
    */

    try {
      const products = await Product.paginate({}, options); // Use pagination plugin to get products
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener productos', error });
    }
  },

  // Get a product by ID
  getProductById: async (req, res) => {
    const productId = req.params.id; // Get product ID from URL

    try {
      const product = await Product.findById(productId).populate('category'); // Find product by ID and populate 'category' field

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener producto', error });
    }
  },

  // Update a product
  updateProduct: async (req, res) => {
    const productId = req.params.id; // Get product ID from URL
    const updates = req.body; // Get product updates

    const options = { new: true }; // Return the updated product

    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updates, options).populate('category'); // Find and update product

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar producto', error });
    }
  },

  // Delete a product (soft delete)
  deleteProduct: async (req, res) => {
    const productId = req.params.id; // Get product ID from URL

    try {
      const product = await Product.findByIdAndUpdate(productId, { delete: true }, { new: true }); // Find and soft delete product

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json({ message: 'Producto eliminado correctamente', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar producto', error });
    }
  }
};

module.exports = productController;