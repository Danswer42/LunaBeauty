const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const upload = require('../middlewares/upload');

router.post('/products', productController.createProduct);

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.patch('/products/:id', productController.updateProduct);

router.patch('/products/images/:id', upload.array('files'), productController.submitImage);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;