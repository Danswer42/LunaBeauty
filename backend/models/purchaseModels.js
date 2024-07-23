/*

Una compra tiene:

- Usuario (ObjectId, ref: Usuario, obligatorio)
- Productos (array, minimo 1 producto, obligatorio)
- Total (number, minimo 0, obligatorio)
- Fecha de compra (Date, default: Date)
- Fecha de creación (Date, default: Date)
- Fecha de actualización (Date, default: Date)
- Fecha de eliminación (Date, default: null)
- Eliminado (boolean)
*/
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      amount: {
        type: Number,
        required: true,
        min: 1
      }
    },
    required: true,
    min: 1
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  purchaseDate: {
    type: Date,
    default: Date.now
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

purchaseSchema.plugin(mongoosePaginate);

const Purchase = mongoose.model("Purchase", purchaseSchema);

Purchase.paginate().then({});

module.exports = Purchase;