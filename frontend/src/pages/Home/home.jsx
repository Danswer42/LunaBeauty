import React from 'react';
import { Product } from './product';
import './home.css';
import imgSrc from "../../../public/images/img02.png";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/products/'; //se hacen las peticiones aqui 

export const Home = () => {

    const[products,setProducts] = useState([]) //se guardan todos los productos
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => { //se hace la peticion para todos los usuarios
        const res = await axios.get(URI)
        setProducts(res.data)
    }

    return (
        <div className="home">
            <div className="products"> 
                <img src={imgSrc} alt="Imagen 02" />
            </div>
        </div>
    )
};
    