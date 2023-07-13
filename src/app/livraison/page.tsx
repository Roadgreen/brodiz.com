'use client'
import styles from './page.module.css'
import {CartContext} from '../../components/Function/cartContext'
import { useContext} from 'react';
import CartContextProvider from '@/components/Function/cartContext'
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
