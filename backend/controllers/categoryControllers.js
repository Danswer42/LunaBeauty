const Category = require('../models/categoryModels');
const regex = require('../tools/regex');
const options = require('../tools/options')
require('path')

const categoryController = {
  createCategory: async (req, res) => {
    try {
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      //options.page = Number(req.query.page) || 1;
      //options.limit = Number(req.query.limit) || 10;
      //const categories = await Category.paginate({deleted: false}, options);
      //res.json(categories);
      const categories = await Category.find();
      const categoryNames = categories.map(category => category.name);
      res.json(categoryNames);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.paginate({deleted: false, _id: req.params.id}, options);
      res.json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      req.body.updatedAt = Date.now();
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      const category = await Category.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
      const paginatedCategory = await Category.paginate({_id: category._id, deleted: false}, options);
      res.json(paginatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
      const paginatedCategory = await Category.paginate({_id: category._id, deleted: false}, options);
      res.json(paginatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = categoryController;