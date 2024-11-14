import React from "react";

export const Product = (props) => {
    const { name, price, description, images } = props;
  
    return (
      <div className="product">
        <div className="slide-var">
          <ul>
              <li key={images}>
                <img src={images} alt={name} />
              </li>
          </ul>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="description">
          <p>
            <b>{name}</b>
          </p>
          <p>${price}</p>
        </div>
      </div>
    );
  };