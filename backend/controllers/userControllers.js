const User = require('../models/userModels');
const Rol = require('../models/rolModels');
const bcrypt = require('bcrypt');
const regex = require('../tools/regex');
const options = require('../tools/options')

const userController = {
  createUser: async (req, res) => {
    try {
      if (!regex.name.test(req.body.name)) {
        return res.status(400).json({ message: "El nombre es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.lastName.test(req.body.lastName)) {
        return res.status(400).json({ message: "El apellido es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.email.test(req.body.email)) {
        return res.status(400).json({ message: "El email es inválido. Debe seguir el formato email@ejemplo.com." });
      }
      if (!regex.phone.test(req.body.phone)) {
        return res.status(400).json({ message: "El número de teléfono no es válido. Debe tener el formato XXX-XXX-XXXX" });
      }
      if (!regex.password.test(req.body.password)) {
        return res.status(400).json({ message: "La contraseña no es válida. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial." });
      }
  
      // Encriptación de contraseña
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
  
      const rol = await Rol.findById(req.body.role);
      if (!rol) {
        return res.status(400).json({ message: "Rol no encontrado. Verifique el ID" });
      }
      req.body.rol = rol._id;
  
      const user = new User(req.body);
      await user.save();
      const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
      return res.status(201).json(paginatedUser, {message: "Usuario creado satisfactoriamente"});
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Error al crear el usuario." });
    }
  },
    
  getUsers: async (req, res) => {
    try {
      const users = await User.paginate({deleted: false}, options);
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.paginate({_id: req.params.id, deleted: false}, options);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: error.message});
    }
  },

  updateUser: async (req, res) => {
    try {
      req.body.updatedAt = Date.now();
      if (!regex.name.test(req.body.name)) {
        return res.status(400).json({ message: "El nombre es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.lastName.test(req.body.lastName)) {
        return res.status(400).json({ message: "El apellido es inválido. Debe contener solo letras y espacios." });
      }
      if (!regex.email.test(req.body.email)) {
        return res.status(400).json({ message: "El email es inválido. Debe seguir el formato email@ejemplo.com." });
      }
      const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
      const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
      return res.status(200).json(paginatedUser, {message: "Usuario editado satisfactoriamente"});
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: error.message});
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
      const paginatedUser = await User.paginate({deleted: false, _id: user._id}, options);
      return res.status(200).json(paginatedUser, {message: "Usuario eliminado satisfactoriamente"});
    } catch (error) {
      console.log(error);
      return res.status(400).json({message: error.message});
    }
  }
};

module.exports = userController;
