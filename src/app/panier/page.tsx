'use client'
import Text from '@/components/TexteSwitch/text'
import Cart from '@/components/Panier/panier'
import Recap from '@/components/Panier/recapPanier/recap'
import styles from './page.module.css'
import {useState,useContext} from 'react'
import CartContextProvider from '@/components/Function/cartContext'

export default function Panier() {





  return (
    <CartContextProvider>
<div className={styles.Container}>
<Cart />
<Recap />
    </div>
    </CartContextProvider>
  )
}
