const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const upload = require('./middlewares/upload')
require('dotenv').config(); 
 
const app = express(); 
const port = process.env.port || 3001; 

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Por favor, selecciona una imagen');
    }

    res.send('Imagen subida correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al subir la imagen');
  }
});

app.get('/', (req, res)=>{
  res.send('Bienvenido a mi api rest')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

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

