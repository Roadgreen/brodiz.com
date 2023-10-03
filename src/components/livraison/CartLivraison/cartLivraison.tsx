import React, { useEffect } from 'react'
import { useContext} from 'react';
import styles from './cartLivraison.module.css'
import { useGlobalContextCart } from '@/app/Context/cartContext';
export default function CartLivraison() {
  const {tot,livPrice,price,cartItem,totalPrice} = useGlobalContextCart();
console.log(tot,livPrice,price,cartItem);
totalPrice(cartItem)
 

console.log(tot,livPrice,price,cartItem);

  return (
    <div className={styles.Container}>
      <div>
      <h3>Dans votre panier</h3>
    {cartItem.map((x:any,i:number)=>{
        return (<p key={i}>x{x.quantity} {x.name} {x.price}€</p>)
    })}
    
    <p>Sous-total: {price}€</p>
    <p>Frais d'expédition estimés: {livPrice}€</p>
    <p>Total: {tot}€</p>
      </div>
  
</div>
  )
}
