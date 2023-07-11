'use client'
import Text from '@/components/TexteSwitch/text'
import Cart from '@/components/Panier/panier'
import Recap from '@/components/Panier/recapPanier/recap'
import styles from './page.module.css'
import {useState} from 'react'

export default function Panier() {
 
  const products = {
    id: 'HUI',
    image: '/img/producthero image/Ryukwomen.jpg',
     name: 'Ryuk Sweatshirt Death Note',
    price: 60,
category: 'hoodies',
quantity: 1,
color: 'blanc',
size: 'L',
alt:'hoodies skull ryuk',
}

const product = [products,products,products,products,products,products];
const [userCart, setUserCart] = useState(product)

function QuantityChange(id:string,quantity:number){
const i = product.findIndex(el=>el.id === id);
product[i].quantity = quantity;
console.log(product)
setUserCart(product)
}

  return (
    <div className={styles.Container}>
<Cart products={userCart} quantity={QuantityChange}/>
<Recap products={userCart}/>
    </div>
  )
}
