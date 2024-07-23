/*

Un producto tiene:

- Nombre (string, minimo 2 caracteres, maximo 50 caracteres, no puede contener caracteres especiales, admite espacios, obligatorio, único)
- Precio (number, minimo 0, maximo 1000000, obligatorio)
- Cantidad (number, minimo 0, maximo 1000000, obligatorio)
- Categoria (ObjectId, default: null, ref: Categoria)
- Imagenes (array, default: [], minimo 1 imagen, maximo 5 imagenes)
- Descripción (string, minimo 2 caracteres, maximo 500 caracteres, no puede contener caracteres especiales, admite espacios, obligatorio)
- Descuento (number, minimo 0, maximo 100, default: 0)
- Fecha de creación (Date, default: Date)
- Fecha de actualización (Date, default: Date)
- Fecha de eliminación (Date, default: null)
- Eliminado (boolean)

*/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const regex = require("../tools/regex.js");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    validate: {
      validator: (value) => regex.name.test(value),
      message: 'El nombre del producto solo puede contener letras, números y espacios.'
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  images: [
    {
    type: String,
    required: true,
    }
  ],
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
    validate: {
      validator: (value) => regex.description.test(value),
      message: 'La descripción del producto solo puede contener letras, números, espacios y signos de puntuación.'
    }
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  deleteDate: {
    type: Date,
    default: null
  },
  delete: {
    type: Boolean,
    default: false
  }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);

Product.paginate().then({});

module.exports = Product;