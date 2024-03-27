import styles from './recap.module.css'
import {useContext,useEffect} from 'react'
import { useGlobalContextCart } from '@/app/Context/cartContext';
import Link from 'next/link';
import 'dotenv/config'

export default function Recap() {
  const {tot,livPrice,price,cartItem,totalPrice} = useGlobalContextCart();
  useEffect(() => {
    console.log(cartItem)
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, [cartItem]);
 totalPrice(cartItem)
 

  
 

  return (
    <div className={styles.Container}>
      <h4>Récapitulatif</h4>
<div>
<p>Sous-total:  {price}€ </p>
      <p>Frais d&apos;expédition: {livPrice}€</p>
</div>
<p>Total: {tot}€</p>
{price === 0 ?  
<button className={styles.buttonOff} disabled>Paiement</button> 
: 
<div className={styles.link} >
  <Link href={'/livraison'} className={styles.button}>
    Paiement
  </Link>



</div>
 }
      
    </div>
  )
}
