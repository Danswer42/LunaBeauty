const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');

router.post('/category', categoryController.createCategory);

router.get('/category', categoryController.getCategories);

router.get('/category/:id', categoryController.getCategoryById);

router.patch('/category/:id', categoryController.updateCategory);

router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;
