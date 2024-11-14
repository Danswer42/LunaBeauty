import { Product } from './product';
import './home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const URI = 'http://localhost:3001/products/'; //se hacen las peticiones aqui 

export const Home = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get(URI);
          setProducts(res.data.docs); // Acceder a los documentos
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      };
      getProducts();
    }, []);
  
    return (
      <div className="shop">
        <div className="products">
            {products.map((product) => {
            console.log('Producto:', product); // Agregar un log para ver los datos del producto
            return <Product key={product._id} {...product} />;
        })}
        </div>
      </div>
    );
  };