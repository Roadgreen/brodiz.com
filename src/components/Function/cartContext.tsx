import {useContext,createContext} from 'react'


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

interface products {
    id:string,
  image: string;
  name: string;
  price: number;
category: string;
quantity: number;
color: string;
size: string;
alt:string;
}

const CartContext = createContext(null)

export default function Cartcontext() {
  return (
    <div>Cartcontext</div>
  )
}
