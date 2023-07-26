'use client'
import styles from './page.module.css'
import ProdCardCrea from '@/components/ProductCard/productCardCreations/prodCardCrea'
import {CartContext} from '../../components/Function/cartContext'
import { useContext} from 'react';
import CartContextProvider from '@/components/Function/cartContext'


export default function Livraison() {

    return (
        <CartContextProvider>
<ProdCardCrea/>
        </CartContextProvider>
        
    )
}