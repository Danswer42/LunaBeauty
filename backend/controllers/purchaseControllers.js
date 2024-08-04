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
  
      const products = await Product.find({ _id: { $in: req.body.products } });
      if (products.length !== req.body.products.length) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      const purchase = new Purchase(req.body);
      await purchase.save();
      const paginatedPurchase = await Purchase.paginate({deleted: false, _id: purchase._id}, options);
      res.status(201).json(paginatedPurchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getPurchases: async (req, res) => {
    try {
      options.page = Number(req.query.page) || 1;
      options.limit = Number(req.query.limit) || 10;
      const purchases = await Purchase.paginate({deleted: false}, options);
      res.json(purchases);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getPurchaseById: async (req, res) => {
    try {
      const purchase = await Purchase.paginate({deleted: false, _id: req.params.id}, options);
      res.json(purchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  updatePurchase: async (req, res) => {
    try {
      req.body.updatedAt = Date.now();
      const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id, deleted: false}, req.body, {new: true});
      const paginatedPurchase = await Purchase.paginate({deleted: false, _id: purchase._id}, options);
      res.json(paginatedPurchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  
  deletePurchase: async (req, res) => {
    try {
      const purchase = await Purchase.findByIdAndUpdate({_id: req.params.id, deleted: false}, {deleted: true, deletedAt: Date.now()}, {new: true});
      res.json(purchase);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = purchaseController;