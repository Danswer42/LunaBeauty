import React from "react";

export const Product = (props) => {
    const { name, price, description, img01 } = props.data; //se le da valor a las variables en funcion de lo que se saca de la base de datos
    return (
        <div className="product"> 
            <div className="slide-var">
                <ul>
                    <li><img src={img01} alt={nombre}/></li>
                </ul>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{name}</b> 
                </p>
                <p> ${price}</p>
            </div>
        </div> 
    );
};