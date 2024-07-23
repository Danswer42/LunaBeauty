const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

// Ruta para crear un producto 
router.post('/products', productController.createProduct);

// Ruta para obtener todos los productos (Paginados)
router.get('/products', productController.getProducts);

// Ruta para obtener un producto por ID
// router.get('/products/:id', productController.getProductById);

// Ruta para actuaizar un producto
router.put('/products/:id', productController.updateProduct);

// Ruta para eliminar un producto
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;