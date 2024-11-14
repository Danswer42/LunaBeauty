const Product = require('../models/productModels');
const Category = require('../models/categoryModels');
const regex = require('../tools/regex');
const options = require('../tools/options');

const productController = {
  createProduct: async (req, res) => {
    try {
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      if(!regex.description.test(req.body.description)){
        return res.status(500).json({message: "La descripción debe tener un maximo de 500 caracteres."})
      }
      console.log(req.body)
      console.log("category:", req.body.category)
      const categoryExists = await Category.findById(req.body.category);
      console.log("categoryExists", categoryExists)
      if (!categoryExists) {
        return res.status(404).json({ message: "Categoria no encontrada. Verifique el ID" });
      }
      const product = new Product(req.body);
      if(req.file){
        product.images = req.file.path
      }
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el producto" });
    }
  },

  submitImages: async (req, res) => {
    try {
      console.log(req.files);
      if (!req.files) {
        return res.status(500).json({ message: 'No se encontraron archivos' });
      }  
      const imgsArray = [];
      req.files.map((file) => {
        if(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg"){
          return res.status(500).json({message: `Imagen, ${file.filename}, no valida, solo se permite formato png, jpeg y jpg`});
        }
        if(file.size > 5000000 || file.size === 0){
          return res.status(500).json({message: `Imagen, ${file.filename}, no válida, permitido 5MB max y no vacío`});
        }
        imgsArray.push(file.path);
      });
      const product = await Product.findByIdAndUpdate({_id: req.params.id, delete: false}, {images: imgsArray}, {new: true});
      //const paginated = await Product.paginate({_id: product._id, delete: false}, options);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al subir la imagen" });
    }
  },

  getProducts: async (req, res) => {
    try {
      //options.page = Number(req.query.page) || 1;
      //options.limit = Number(req.query.limit) || 10;
      const products = await Product.paginate({}, options);
      if (!products.docs.length) {
        return res.status(404).json({ message: "No se encontraron productos"})
      }
      res.json(products);
      //const products = await Product.find();
      //const productsNames = products.map(products => products.name);
      //res.json(productsNames);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  },
  
  getProductById: async (req, res) => {
    try {
      if(!req.params.id){
        res.status(403).json({message: "Requiere ID"}
        )
      }
      const product = await Product.findById(req.params.id);
      //const product = await Product.paginate({deleted: false, _id: req.params.id}, options);
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  /*// Search products (for suggestions)
  getProductsForSearch: async (req, res) => {
    const { query } = req.query;
    const searchRegex = new RegExp(query, 'i');
    const products = await Product.find({ name: searchRegex }, { name: 1 }).limit(10);
    res.status(200).json(products);
  },*/
  
  updateProduct: async (req, res) => {
    try {
      req.body.updateDate = Date.now();
      if(!regex.name.test(req.body.name)){
        return res.status(500).json({message: "El nombre es inválido. Debe contener solo letras y espacios."})
      }
      if(!regex.description.test(req.body.description)){
        return res.status(500).json({message: "La descripción debe tener un maximo de 500 caracteres."})
      }
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Categoria no encontrada. Verifique el ID" });
      }
      console.log(req.body)
      console.log("category:", req.body.category)
      const product = await Product.findByIdAndUpdate({_id: req.params.id, delete: false}, req.body, {new: true});
      //const paginatedProduct = await Product.paginate({_id: product._id, deleted: false}, options);
      console.log("categoryExists", categoryExists)
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate({_id: req.params.id, delete: false}, {delete: true, deleteDate: Date.now()}, {new: true});
      await product.save();
      res.json({ message:"Producto eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  }
};

module.exports = productController;