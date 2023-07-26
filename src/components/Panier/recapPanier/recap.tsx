import styles from './recap.module.css'
import {useContext,useEffect} from 'react'
import {CartContext} from '../../Function/cartContext'
import Link from 'next/link';
import 'dotenv/config'

export default function Recap() {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  const Cart = useContext(CartContext);
 Cart?.totalPrice(Cart.cartItem)
 
  
 

  return (
    <div className={styles.Container}>
      <h4>Récapitulatif</h4>
<div>
<p>Sous-total:  {Cart?.price}€ </p>
      <p>Frais d`&aposexpédition: {Cart?.livPrice}€</p>
</div>
<p>Total: {Cart?.tot}€</p>
{Cart?.price === 0 ?  
<button className={styles.buttonOff} disabled>Paiement</button> 
: 
<div className={styles.link} >
  <button  className={styles.button}>
    Checkout
  </button>



</div>
 }
      
    </div>
  )
}
