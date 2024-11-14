const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express(); 
const port = process.env.port || 3001; 
require('dotenv').config(); 

app.get('/', (req, res)=>{
  res.send('Bienvenido a mi api rest')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//conectar a la base de datos
mongoose.connect(process.env.MONGDB_URL || 'mongodb://localhost:27017/LunaBeauty');

const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
const purchase = require('./routes/purchaseRoutes');
const rol = require('./routes/rolRoutes');
const user = require('./routes/userRoutes');

app.use(
  category,
  product,
  purchase,
  rol,
  user
);

app.listen(port, () => {
    console.log('Me ejecuto en el puerto ' + port);
});

