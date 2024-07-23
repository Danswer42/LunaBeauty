const Purchase = require('../models/purchaseModels'); // Importar el modelo de compra
const { validationResult } = require('express-validator');

const purchaseController = {
  createPurchase: async (req, res) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newPurchase = new Purchase(req.body); // Crear una nueva instancia de compra

    try {
      await newPurchase.save(); // Guardar la compra en la base de datos
      res.status(201).json({ message: 'Compra creada correctamente', purchase: newPurchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear compra', error });
    }
  },

  // Obtener todas las compras (con paginación)
  getPurchases: async (req, res) => {
    const options = {
      page: parseInt(req.query.page) || 1, // Obtener el número de página de la consulta o establecer el valor predeterminado en 1
      limit: parseInt(req.query.limit) || 10, // Obtener el límite de la consulta o establecer el valor predeterminado en 10
      sort: { purchaseDate: -1 }, // Ordenar por fecha de compra descendente
      populate: ['user', 'product.product'] // Completar campos 'usuario' y 'producto.producto'
    };

    try {
      const purchases = await Purchase.paginate({}, options); // Usar el complemento de paginación para obtener compras
      res.status(200).json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener compras', error });
    }
  },

  // Obtener una compra por ID
  getPurchaseById: async (req, res) => {
    const purchaseId = req.params.id; // Obtener el ID de la compra de la URL

    try {
      const purchase = await Purchase.findById(purchaseId).populate(['user', 'product.product']); // Buscar compra por ID y completar campos 'usuario' y 'producto.producto'

      if (!purchase) {
        return res.status(404).json({ message: 'Compra no encontrada' });
      }

      res.status(200).json({ purchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener compra', error });
    }
  },

  // Eliminar una compra (eliminación parcial)
  deletePurchase: async (req, res) => {
    const purchaseId = req.params.id; // Obtener el ID de la compra de la URL

    try {
      const purchase = await Purchase.findByIdAndUpdate(purchaseId, { delete: true }, { new: true }); // Buscar y eliminar parcialmente la compra

      if (!purchase) {
        return res.status(404).json({ message: 'Compra no encontrada' });
      }

      res.status(200).json({ message: 'Compra eliminada correctamente', purchase });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar compra', error });
    }
  }
};

module.exports = purchaseController;