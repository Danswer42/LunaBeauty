const Purchase = require('../models/purchaseModels');
const User = require('../models/userModels');
const Product = require('../models/productModels');
const options = require('../tools/options')

const purchaseController = {
  createPurchase: async (req, res) => {
    try {
      const user = await User.findById(req.body.user);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const checkProduct = async (array) => {
        if (!Array.isArray(array)) {
            return "Error: El valor pasado no es un array";
        }
      
        const onlyID = array.map(obj => obj.product); // Extrae solo la propiedad "product"
        const record = await Product.find({ '_id': { $in: onlyID } });
        if (!record.length || record.length !== onlyID.length) {
            return "Producto ";
        }
      }
      const purchase = new Purchase(req.body);
      await purchase.save();
      res.status(201).json(purchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear la compra"});
    }
  },

  getPurchases: async (req, res) => {
    try {
      const purchases = await Purchase.find();
      res.json(purchases);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener la compra" });
    }
  },

  getPurchaseById: async (req, res) => {
    try {
      const purchase = await Purchase.find();
      res.json(purchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  updatePurchase: async (req, res) => {
    try {
      req.body.updateDate = Date.now();
      const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id, delete: false}, req.body, {new: true});
      await purchase.save();
      res.json(purchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al actualizar compra" });
    }
  },
  
  deletePurchase: async (req, res) => {
    try {
      await Purchase.findByIdAndDelete({_id: req.params.id});
      res.json({ message: "Compra eliminada correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar la compra" });
    }
  }
};

module.exports = purchaseController;