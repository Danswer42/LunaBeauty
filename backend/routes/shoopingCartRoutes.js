const express = require('express');
const router = express.Router();
const cartController = require('../controllers/shoppingCartControllers');

router.post('/', cartController.createCart);
router.get('/', cartController.getAllCarts); 
router.get('/:cartId', cartController.getCartById); 
router.put('/:cartId', cartController.updateCart);
router.delete('/:cartId', cartController.deleteCart);

module.exports = router;