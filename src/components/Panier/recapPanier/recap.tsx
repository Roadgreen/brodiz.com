import styles from './recap.module.css'
import {useContext} from 'react'
import {CartContext} from '../../Function/cartContext'



export default function Recap() {
  const Cart = useContext(CartContext);
 
  
 
 

  return (
    <div className={styles.Container}>
      <h4>Récapitulatif</h4>
<div>
<p>Sous-total:  {Cart?.totalPrice(Cart.cartItem)}€ </p>
      <p>Frais d'expédition: €</p>
</div>
<p>Total: €</p>
<button>Paiement</button>
      
    </div>
  )
}
