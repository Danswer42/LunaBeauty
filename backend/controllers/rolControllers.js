const Rol = require('../models/rolModels'); // Importar el modelo Rol

// Controlador de roles
const rolController = {
  // Crear un rol
  crearRol: async (req, res) => {
    const nuevoRol = new Rol({ nombre: req.body.nombre }); // Crear una nueva instancia de Rol

    try {
      await nuevoRol.save(); // Guardar el rol en la base de datos
      res.status(201).json({ message: 'Rol creado correctamente', rol: nuevoRol });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el rol', error });
    }
  },

  // Obtener todos los roles
  obtenerRoles: async (req, res) => {
    try {
      const roles = await Rol.find(); // Buscar todos los roles en la base de datos
      res.status(200).json({ roles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener roles', error });
    }
  },

  // Obtener un rol por ID
  obtenerRolPorId: async (req, res) => {
    const rolId = req.params.id; // Obtener el ID del rol de la URL

    try {
      const rol = await Rol.findById(rolId); // Buscar el rol por ID en la base de datos

      if (!rol) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      res.status(200).json({ rol });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener rol', error });
    }
  },

  // Actualizar un rol
  actualizarRol: async (req, res) => {
    const rolId = req.params.id; // Obtener el ID del rol de la URL
    const nuevosDatos = req.body; // Obtener los nuevos datos del rol

    try {
      const rol = await Rol.findByIdAndUpdate(rolId, nuevosDatos, { new: true }); // Buscar y actualizar el rol por ID

      if (!rol) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      res.status(200).json({ message: 'Rol actualizado correctamente', rol });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar rol', error });
    }
  },

  // Eliminar un rol
  eliminarRol: async (req, res) => {
    const rolId = req.params.id; // Obtener el ID del rol de la URL

    try {
      await Rol.findByIdAndDelete(rolId); // Buscar y eliminar el rol por ID

      res.status(200).json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar rol', error });
    }
  }
};

module.exports = rolController;