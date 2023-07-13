import styles from './recap.module.css'
import {useContext} from 'react'
import {CartContext} from '../../Function/cartContext'
import Link from 'next/link';


export default function Recap() {
  const Cart = useContext(CartContext);
 Cart?.totalPrice(Cart.cartItem)
  
 
 

  return (
    <div className={styles.Container}>
      <h4>Récapitulatif</h4>
<div>
<p>Sous-total:  {Cart?.price}€ </p>
      <p>Frais d'expédition: €</p>
</div>
<p>Total: €</p>
{Cart?.price === 0 ?  
<button className={styles.buttonOff} disabled>Paiement</button> 
: <Link className={styles.link} href={'/'}><button className={styles.button} >Paiement</button></Link> }
      
    </div>
  )
}
