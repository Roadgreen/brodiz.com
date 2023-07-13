import React from 'react'
import { useContext} from 'react';
import { CartContext } from '../Function/cartContext';
import styles from './livraison.module.css'

export default function LivraisonPart() {
    const Cart = useContext(CartContext);
    console.log(Cart?.cartItem)
  return (
    <div className={styles.Container}>
        <div>
        <div>
    <h3>Livraison</h3>
</div>
<div>
    <form className={styles.Form}>
        <div>
        <input placeholder='Prénom'></input>
        <input placeholder='Nom'></input>
        </div>
        <div>
        <input placeholder='Code postal'></input>
        <input placeholder='Ville'></input>
        <input placeholder='Pays'></input>
        </div>  
        <div>
        <input placeholder='Email'></input>
        <input placeholder='Numéro de téléphone'></input>
        </div>
    </form>
</div>
        </div>
        </div>
  )
}
