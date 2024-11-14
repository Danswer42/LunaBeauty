const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage, limits: { files: 3 } });

router.post('/products', productController.createProduct);

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.patch('/products/:id', productController.updateProduct);

router.patch('/products/imgs/:id',upload.array('files'), productController.submitImages);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;