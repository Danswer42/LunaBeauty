const User = require('../models/userModels');
const Rol = require('../models/rolModels');
const bcrypt = require('bcrypt');
const regex = require('../tools/regex');
const options = require('../tools/options');

const userController = {
  createUser: async (req, res) => {
    try {
      if (!regex.name.test(req.body.name)) {
        return res.status(400).json({ message: "El nombre es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.lastname.test(req.body.lastname)) {
        return res.status(400).json({ message: "El apellido es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.email.test(req.body.email)) {
        return res.status(400).json({ message: "El email es inválido. Debe seguir el formato email@ejemplo.com" });
      }
      if (!regex.phone.test(req.body.phone)) {
        return res.status(400).json({ message: "El número de teléfono no es válido. Debe tener el formato +584123456789" });
      }
      if (!regex.password.test(req.body.password)) {
        return res.status(400).json({ message: "La contraseña no es válida. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial." });
      }
  
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const rol = await Rol.findById(req.body.rol);
      if (!rol) {
        return res.status(400).json({ message: "Rol no encontrado. Verifique el ID" });
      }
      req.body.rol = rol._id;
  
      const user = new User(req.body);
      await user.save();
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Error al crear el usuario." });
    }
  },
    
  getUsers: async (req, res) => {
    try {
      const users = await User.paginate({delete: false}, options);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.paginate({_id: req.params.id, delete: false}, options);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: "Error al obtener usuario. Verifque ID"});
    }
  },

  submitImages: async (req, res) => {
    try {
      console.log(req.file);
      if(req.file === undefined){
        return res.status(500).json({message: "Imagen no encontrada"});
      }
      if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg"){
        return res.status(500).json({message: `imagen, ${req.file.filename}, no válida, solo se permite formato png, jpeg y jpg`});
      }
      if(req.file.size > 5000000 || req.file.size === 0){
        return res.status(500).json({message: `imagen, ${req.file.filename}, no válida, permitido 5MB max y no vacío`});
      }
      const user = await User.findByIdAndUpdate({_id: req.params.id, delete: false}, {image: req.file.path}, {new: true});
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al subir la imagen" });
    }
  },

  updateUser: async (req, res) => {
    try {
      req.body.updateDate = Date.now();
      if (!regex.name.test(req.body.name)) {
        return res.status(400).json({ message: "El nombre es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.lastname.test(req.body.lastname)) {
        return res.status(400).json({ message: "El apellido es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.email.test(req.body.email)) {
        return res.status(400).json({ message: "El email es inválido. Debe seguir el formato email@ejemplo.com." });
      }
      const user = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: "Error al editar el usuario"});
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate({_id: req.params.id, delete: false}, {delete: true, deleteDate: Date.now()}, {new: true});
      await user.save();
      return res.status(200).json({message: "Usuario eliminado satisfactoriamente"});
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: "Error al eliminar el usuario"});
    }
  }
};

module.exports = userController;
