/*

  Un usuario tiene:

- Nombre
- Apellido
- Teléfono
- Imagen
- Correo
- Contraseña
- Rol (Admin, User)
- Carrito de compra
- Compras
- Fecha de creación
- Fecha de actualización
- Fecha de eliminación
- Eliminado (boolean)

*/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const regex = require("../tools/regex.js");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: regex.name
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: regex.lastname
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: regex.phone
  },
  image: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: regex.email
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: regex.password, 
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Rol",
    default: null
  },
  purchases: {
    type: Array,
    ref: "Purchase",
    default: []
  },
  cart:{
    type: Array,
    default: []
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

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

User.paginate().then({});

module.exports = User;