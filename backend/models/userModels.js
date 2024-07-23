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
    validate: {
      validator: (value) => regex.name.test(value),
      message: 'El nombre solo puede contener letras, números y espacios.'
    }
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    validate: {
      validator: (value) => regex.lastname.test(value),
      message: 'El apellido solo puede contener letras, números y espacios.'
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => regex.phone.test(value),
      message: 'El teléfono debe tener un formato válido (entre 9 y 15 dígitos).'
    }
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
    validate: {
      validator: (value) => regex.email.test(value),
      message: 'El correo electrónico debe tener un formato válido.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (value) => regex.password.test(value),
      message: 'La contraseña debe tener al menos 8 caracteres, incluir una letra minúscula, una mayúscula, un número y un símbolo especial.'
    }
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  purchases: {
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