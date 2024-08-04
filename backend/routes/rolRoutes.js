const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolControllers'); // Importar el controlador de roles

router.post('/rol', rolController.createRol);

router.get('/rol', rolController.getRoles);

router.get('/rol/:id', rolController.getRolById);

router.put('/rol/:id', rolController.updateRol);

router.delete('/rol/:id', rolController.deleteRol);

module.exports = router;