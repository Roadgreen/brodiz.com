'use client'
import styles from './page.module.css'
import {CartContext} from '../Context/cartContext'
import { useContext} from 'react';
import CartContextProvider from '@/app/Context/cartContext'
import LivraisonPart from '@/components/livraison/livraison';
import CartLivraison from '@/components/livraison/CartLivraison/cartLivraison';
export default function Livraison() {
   

    return (
<CartContextProvider>
    <div className={styles.Container}>
    <LivraisonPart/>
<CartLivraison/>
    </div>
</CartContextProvider>
    )
}
