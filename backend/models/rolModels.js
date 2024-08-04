/*

Un rol tiene:

- Nombre (string, minimo 2 caracteres, maximo 50 caracteres, no puede contener caracteres especiales, admite espacios, obligatorio, único)
- Fecha de creación (Date, default: Date)
- Fecha de actualización (Date, default: Date)
- Fecha de eliminación (Date, default: null)
- Eliminado (boolean)

*/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const regex = require("../tools/regex.js");
const Schema = mongoose.Schema;

const rolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: regex.name,
    unique: true
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

rolSchema.plugin(mongoosePaginate);

const Rol = mongoose.model("Rol", rolSchema);

Rol.paginate().then({});

module.exports = Rol;