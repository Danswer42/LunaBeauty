const Rol = require('../models/rolModels');
const regex = require('../tools/regex');
const options = require('../tools/options')

const rolController = {
  createRol: async (req, res) => {
    try {
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "Name is not valid"})
      }
      const rol = new Rol(req.body);
      await rol.save();
      res.status(201).json(rol);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  
  getRoles: async (req, res) => {
    try {
      const roles = await Rol.paginate({}, options);
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getRolById: async (req, res) => {
    try {
      const rol = await Rol.findById(req.params.id);
      res.json(rol);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al encontrar rol. Verifique ID" });
    }
  },

  updateRol: async (req, res) => {
    try {
      req.body.updateDate = Date.now();
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      const rol = await Rol.findByIdAndUpdate({_id: req.params.id, delete: false}, req.body, {new: true});
      await rol.save();
      res.json(rol);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al actualizar el rol" });
    }
  },

  deleteRol: async (req, res) => {
    try {
      const rol = await Rol.findByIdAndDelete({_id: req.params.id, delete: false}, {delete: true, deleteDate: Date.now()}, {new: true});
      res.json({ message: "Rol eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = rolController;