import {db} from "../data/db"
import type { CartItem, Guitar } from "../models"

export type CartActions =
    { type :  'add-to-cart' , payload : {item : Guitar}}|
    { type :  'remove-from-cart' , payload : {id : Guitar['id']}}|
    { type :  'decrease-quantity' , payload : {id : Guitar['id']}}|
    { type :  'increase-quantity' , payload : {id : Guitar['id']}} |
    { type : 'clear-cart'}

export type CartState = {
    data : Guitar[],
    cart : CartItem[]
}
const initialCart = ()=>{
    const localStorageCart = localStorage.getItem("cart")
    return localStorageCart ? JSON.parse(localStorageCart) : []
}
export const initialState : CartState ={
    data : db,
    cart : initialCart()
}

export const cartReducer  = (
    state : CartState = initialState,
    action : CartActions
) : CartState =>{
    if(action.type === "add-to-cart"){
        const indexExists = state.cart.findIndex(item => item.id ==action.payload.item.id)
        let updatedCart = [...state.cart]
        if(indexExists > -1){
            updatedCart = state.cart.map( item => item.id === action.payload.item.id ?
                 {
                   ...item,
                   quantity : item.quantity+1     
                }: item)
        }  else{
            const item : CartItem = {...action.payload.item , quantity : 1}
            updatedCart =[...state.cart,item]
        }
        return {
            ...state,
            cart : updatedCart
        }    
    }
    if(action.type === "remove-from-cart"){
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        return {
        ...state,
        cart : updatedCart
        }
    }
    if(action.type === "decrease-quantity"){
        const updatedCart = state.cart.map(item => 
            {
             if(item.id == action.payload.id && item.quantity >1){
                 return {
                     ...item,
                     quantity : item.quantity -1
                 }
             }
             return item
            })
         
        return {
            ...state,
            cart : updatedCart
        }
    }
    if(action.type === "increase-quantity"){
        const updatedCart = state.cart.map(item => 
            {
             if(item.id === action.payload.id){
                 return {
                     ...item,
                     quantity : item.quantity +1
                 }
             }
             return item
            }
         )
        
        return {
            ...state,
            cart : updatedCart
        }
    }
    if(action.type === "clear-cart"){
        return {
            ...state,
            cart : []
        }
    }
    return initialState
}