const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolControllers'); // Importar el controlador de roles

// Ruta para crear un rol
router.post('/roles', rolController.crearRol);

// Ruta para obtener todos los roles
router.get('/roles', rolController.obtenerRoles);

// Ruta para obtener un rol por ID
router.get('/roles/:id', rolController.obtenerRolPorId);

// Ruta para actualizar un rol
router.put('/roles/:id', rolController.actualizarRol);

// Ruta para eliminar un rol
router.delete('/roles/:id', rolController.eliminarRol);

module.exports = router;