import React from "react"
import type { Guitar} from "../models"

interface GuitarProps{
    guitar : Guitar,
    addToCart : (guitar : Guitar) => void
} 

const Guitar : React.FC<GuitarProps> = ({guitar,addToCart}) => {

    const handleClick =()=>{
        console.log(guitar)
        addToCart(guitar)
    }
    const {description,name,price,image} = guitar
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        onClick={()=>handleClick()}
                        type="button"
                        className="btn btn-dark w-100"
                    >Agregar al Carrito</button>
                </div>
            </div>
  )
}

export default Guitar