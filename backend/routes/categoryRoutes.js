const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');

// Ruta para crear una categoria
router.post('/categories', categoryController.createCategory);

// Ruta para obtener todas las categorias (paginadas)
router.get('/categories', categoryController.getCategories);

// Ruta para obtener una categoria por Id
// router.get('/categories/:id', categoryController.getCategoryById);

// Ruta para actualizar una cateoria
router.put('/categories/:id', categoryController.updateCategory);

// Ruta para eliminar una cateogria
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
