export type Guitar ={
        id : number,
        name : string,
        description : string,
        image : string,
        price : number,
    
}
export type CartItem = Guitar &{
    quantity : number
}
// export type CartItem = Pick<Guitar,'id' |'name' | 'price'> & {
//     quantity : number
// }