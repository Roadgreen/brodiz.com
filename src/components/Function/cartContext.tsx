import { useContext, createContext, useState } from "react";


const prod = {
  id: "HUI",
  image: "/img/producthero image/Ryukwomen.jpg",
  name: "Ryuk Sweatshirt Death Note",
  price: 60,
  category: "hoodies",
  quantity: 1,
  color: "blanc",
  size: "L",
  alt: "hoodies skull ryuk",
};
interface products {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  color: string;
  size: string;
  alt: string;
}
interface product {
  products: {
      id:string,
    image: string;
    name: string;
    price: number;
category: string;
quantity: number;
color: string;
size: string;
alt:string;
  }[],
}
type CartContext = {
  addToCart: (products: products) => void; removeFromCart: (products: products) => void; updatedCart: (products: products) => void; cartItem: any; totalPrice: (products: any) => void;price: any;
}

const product = [ prod];

export const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({children}:any) {
  const [cartItem, setCartItem] = useState<any>(product);

  const [price, setPrice] = useState<any>(0);

  const addToCart = (products: products) => {
    const newItem = [...cartItem,products];

    setCartItem(newItem);
  };
const removeFromCart = (products:products) => {
  const id = products.id;
  const updatedCart = cartItem.filter((item: products) => item.id !== id);
  setCartItem(updatedCart);
  console.log(cartItem)
}

const totalPrice =  (products:any) => {
  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const { quantity, price } = product;

    totalPrice += quantity * price;
  }
 setPrice(totalPrice);
}
const updatedCart = (products:products) => {
  const id = products.id;
  const hisId = (x:products) => x.id === id;
  const ind = cartItem.findIndex(hisId);
  const newCart = cartItem.splice(ind,1,products);
  setCartItem(newCart);
}
  return <CartContext.Provider value={{
    addToCart,removeFromCart,updatedCart,cartItem,totalPrice,price
  }}>{children}</CartContext.Provider>;
}
