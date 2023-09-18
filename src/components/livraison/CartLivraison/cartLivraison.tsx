import React from 'react'
import { useContext} from 'react';
import styles from './cartLivraison.module.css'
import { CartContext } from '../../../app/Context/cartContext';

export default function CartLivraison() {
    const Cart = useContext(CartContext);
console.log(Cart?.cartItem)
  return (
    <div className={styles.Container}>
      <div>
      <h3>Dans votre panier</h3>
    {Cart?.cartItem.map((x:any)=>{
        return (<p>x{x.quantity} {x.name} {x.price}€</p>)
    })}
    
    <p>Sous-total: {Cart?.price}€</p>
    <p>Frais d'expédition estimés: {Cart?.livPrice}€</p>
    <p>Total: {Cart?.tot}€</p>
      </div>
  
</div>
  )
}
