const express = require('express'); //requerir express
const mongoose = require('mongoose'); //requerir mongoose
const cors = require('cors'); //requerir cors
const app = express(); //ejecutar express
const port = 3001; //crear un puerto
app.use(express.json()); //usar json

app.use(cors());

//conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/nodejs');

const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
const purchase = require('./routes/purchaseRoutes');
const rol = require('./routes/rolRoutes');
const cart = require('./routes/shoopingCartRoutes');
const user = require('./routes/userRoutes');

app.use(
  category,
  product,
  purchase,
  rol,
  cart,
  user
);

app.listen(port, () => {
    console.log('Me ejecuto en el puerto ' + port);
});

