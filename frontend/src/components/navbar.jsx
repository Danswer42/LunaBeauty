import React, { useContext } from "react";//se importa react y el usecontext para poder usar el context que se usa globalmente
import { Link } from "react-router-dom";//se importa para darle direcciones a las paginas
import { List } from "phosphor-react";//se importa el shopping cart ya que desde el header se llama al shopping cart
import { SquaresFour } from "phosphor-react"
import "./navbar.css";//se importa el css
import { ShopContext } from "../context/shop-context";//se importa el shop context que contiene funciones utilizadas en todas partes en la aplicacion

export const Navbar = () => {
    const context = useContext(ShopContext);//le damos las funciones del shop context a la variable context
    
    return (
        <div className="navbar">
                <div className="links"> 
                    <Link to="/category">
                        <SquaresFour size={44} />   
                    </Link>
                </div>
                <div className="icons">
                    <img src="/LogoTienda.png" alt="" /> 
                </div>
                <div className="icons"> 
                    <List size={44} />  
                </div>
        </div>
        
    )
};
