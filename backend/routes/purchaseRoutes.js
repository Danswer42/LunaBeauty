const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseControllers');

router.post('/purchases', purchaseController.createPurchase);

router.get('/purchases', purchaseController.getPurchases);

router.get('/purchases/:id', purchaseController.getPurchaseById);

router.patch('/purchases/:id', purchaseController.updatePurchase);

router.delete('/purchases/:id', purchaseController.deletePurchase);

module.exports = router;
