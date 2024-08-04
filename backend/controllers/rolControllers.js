const Rol = require('../models/rolModels'); // Importar el modelo Rol
const regex = require('../tools/regex');
const options = require('../tools/options')

const rolController = {
  createRol: async (req, res) => {
    try {
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      const rol = new Rol(req.body);
      await rol.save();
      res.status(201).json(rol, {message: "Rol creado satisfactoriamente"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getRoles: async (req, res) => {
    try {
      options.page = Number(req.query.page) || 1;
      options.limit = Number(req.query.limit) || 10;
      const roles = await Rol.paginate({deleted: false}, options);
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getRolById: async (req, res) => {
    try {
      const rol = await Rol.paginate({deleted: false, _id: req.params.id}, options);
      res.json(rol);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  updateRol: async (req, res) => {
    try {
      req.body.updatedAt = Date.now();
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      const rol = await Rol.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
      const paginatedRol = await Rol.paginate({deleted: false, _id: rol._id}, options);
      console.log(paginatedRol);
      res.json(paginatedRol);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  deleteRol: async (req, res) => {
    try {
      const rol = await Rol.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
      res.json(rol);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = rolController;