const User = require('../models/userModels'); // Import the User model
const { validationResult } = require('express-validator');

// User controller
const userController = {
  // Create a user
  createUser: async (req, res) => {
    const errors = validationResult(req); // Check for validation errors

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = new User(req.body); // Create a new user instance

    try {
      await newUser.save(); // Save the user to the database
      res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear usuario', error });
    }
  },

  // Get all users (with pagination)
  getUsers: async (req, res) => {
    const options = {
      page: parseInt(req.query.page) || 1, // Get page number from query or set default to 1
      limit: parseInt(req.query.limit) || 10, // Get limit from query or set default to 10
      sort: { creationDate: -1 }, // Sort by creation date descending
    };

    try {
      const users = await User.paginate({}, options); // Use pagination plugin to get users
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  },

  // Get a user by ID
  getUserById: async (req, res) => {
    const userId = req.params.id; // Get user ID from URL

    try {
      const user = await User.findById(userId); // Find user by ID

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener usuario', error });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    const userId = req.params.id; // Get user ID from URL
    const updates = req.body; // Get user updates

    const options = { new: true }; // Return the updated user

    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updates, options); // Find and update user

      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
  },

  // Delete a user (soft delete)
  deleteUser: async (req, res) => {
    const userId = req.params.id; // Get user ID from URL

    try {
      const user = await User.findByIdAndUpdate(userId, { delete: true }, { new: true }); // Find and soft delete user

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({ message: 'Usuario eliminado correctamente', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
  }
};

module.exports = userController;
