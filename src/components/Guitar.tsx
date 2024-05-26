import React from "react"
import type { Guitar} from "../models"
import type { CartActions } from "../reducers/cart-reducer"

interface GuitarProps{
    guitar : Guitar,
    dispatch : React.Dispatch<CartActions>
} 

const Guitar : React.FC<GuitarProps> = ({guitar,dispatch}) => {

    const handleClick =()=>{
        dispatch({
            type : 'add-to-cart',
            payload : {
                item :guitar
            }
        })
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