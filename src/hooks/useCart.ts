import { useEffect, useState } from "react"
import { CartItem, Guitar } from "../models"

export const useCart = ()=>{
    const initialCart = ()=>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) :[]
    }
    const [cart, setCart] = useState<CartItem[]>(initialCart)

    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart))
    }, [cart])
    

    const addToCart = (guitar : Guitar)=>{
        const indexExists = cart.findIndex(item => item.id ==guitar.id)
        if(indexExists > -1){
            const updatedCart = [...cart]
            if( updatedCart[indexExists]){
                updatedCart[indexExists].quantity++;
            }
            setCart(updatedCart)    
        }  else{
            const item : CartItem = {...guitar , quantity : 1}
            setCart(cart => [...cart,item])
        }
    }
    const removeFromCart = (id : number)=>{
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const increaseQuantity = (id : number)=>{
        setCart(prevCart => prevCart.map(item => 
               {
                if(item.id == id){
                    return {
                        ...item,
                        quantity : item.quantity +1
                    }
                }
                return item
               }
            ))
    }
    const decreaseQuantity = (id : number)=>{
        setCart(prevCart => prevCart.map(item => 
            {
             if(item.id == id && item.quantity >1){
                 return {
                     ...item,
                     quantity : item.quantity -1
                 }
             }
             return item
            }
         ))
    }

    const isEmpty = cart.length ===0
    const cartTotal = cart.reduce((total,item)=> total +(item.quantity * item.price),0 )
    useEffect(()=>{
        console.log("Login")
    },[isEmpty])
    return {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isEmpty,
        cartTotal
    }
}
