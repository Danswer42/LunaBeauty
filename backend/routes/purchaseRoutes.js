const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseControllers');

// Ruta para crear una compra
router.post('/purchases', purchaseController.createPurchase);

// Ruta para obtener todas las compras (Paginadas)
router.get('/purchases', purchaseController.getPurchases);

// Ruta para obtener una compra por ID
router.get('/purchases/:id', purchaseController.getPurchaseById);

// Route for deleting a purchase (soft delete)
router.delete('/purchases/:id', purchaseController.deletePurchase);

module.exports = router;
