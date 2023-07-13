import React from 'react'
import { useContext} from 'react';
import { CartContext } from '../../Function/cartContext';

export default function CartLivraison() {
    const Cart = useContext(CartContext);
console.log(Cart?.cartItem)
  return (
    <div>
    <h3>Dans votre panier</h3>
    {Cart?.cartItem.map((x:any)=>{
        return (<p>x{x.quantity} {x.name} {x.price}€</p>)
    })}
    
    <p>Sous-total: {}</p>
    <p>Frais d'expédition estimés: </p>
    <p>Total: </p>
</div>
  )
}
