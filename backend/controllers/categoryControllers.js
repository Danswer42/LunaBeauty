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
      const categories = await Category.paginate({}, options);
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
  
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      req.body.updateDate = Date.now();
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre no es válido"})
      }
      const category = await Category.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name });
      await category.save();
      res.json({message: 'Categoría actualizada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar la categoria" });
    }
  },

  deleteCategory: async (req, res) => {
    await Category.findByIdAndDelete({_id: req.params.id});
    res.send({message: "Categoría eliminada correctamente"});
  }
};

module.exports = categoryController;