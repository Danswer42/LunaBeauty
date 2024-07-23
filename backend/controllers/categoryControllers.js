const Category = require('../models/categoryModels'); // Import the Category model
const { check, validationResult } = require('express-validator');

// Category controller
const categoryController = {
  // Create a category
  createCategory: async (req, res) => {
    const errors = validationResult(req); // Check for validation errors

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newCategory = new Category(req.body); // Create a new category instance

    try {
      await newCategory.save(); // Save the category to the database
      res.status(201).json({ message: 'Categoría creada correctamente', category: newCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear categoría', error });
    }
  },

  // Get all categories (with pagination)
  getCategories: async (req, res) => {
    const options = {
      page: parseInt(req.query.page) || 1, // Get page number from query or set default to 1
      limit: parseInt(req.query.limit) || 10, // Get limit from query or set default to 10
      sort: { creationDate: -1 }, // Sort by creation date descending
    };

    try {
      const categories = await Category.paginate({}, options); // Use pagination plugin to get categories
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener categorías', error });
    }
  },

  // Get a category by ID
  getCategoryById: async (req, res) => {
    const categoryId = req.params.id; // Get category ID from URL

    try {
      const category = await Category.findById(categoryId); // Find category by ID

      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      res.status(200).json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener categoría', error });
    }
  },

  // Update a category
  updateCategory: async (req, res) => {
    const categoryId = req.params.id; // Get category ID from URL
    const updates = req.body; // Get category updates

    const options = { new: true }; // Return the updated category

    try {
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, updates, options); // Find and update category

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      res.status(200).json({ message: 'Categoría actualizada correctamente', category: updatedCategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar categoría', error });
    }
  },

  // Delete a category (soft delete)
  deleteCategory: async (req, res) => {
    const categoryId = req.params.id; // Get category ID from URL

    try {
      const category = await Category.findByIdAndUpdate(categoryId, { delete: true }, { new: true }); // Find and soft delete category

      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      res.status(200).json({ message: 'Categoría eliminada correctamente', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar categoría', error });
    }
  }
};

module.exports = categoryController;