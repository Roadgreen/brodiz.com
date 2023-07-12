import { useContext, createContext, useState } from "react";

const products = {
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
   addToCart: (products: products) => void; removeFromCart: (products: products) => void; updatedCart: (products: products) => void; 
}

const product = [products, products, products];

const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({children}:any) {
  const [cartItem, setCartItem] = useState<any>(product);

  const addToCart = (products: products) => {
    const newItem = [...cartItem,products];

    setCartItem(newItem);
  };
const removeFromCart = (products:products) => {
  const id = products.id;
  const hisId = (x:products) => x.id === id;
  const ind = cartItem.findIndex(hisId);
  const newCart = cartItem.splice(ind,1);
  setCartItem(newCart);
}
const updatedCart = (products:products) => {
  const id = products.id;
  const hisId = (x:products) => x.id === id;
  const ind = cartItem.findIndex(hisId);
  const newCart = cartItem.splice(ind,1,products);
  setCartItem(newCart);
}
  return <CartContext.Provider value={{
    addToCart,removeFromCart,updatedCart
  }}>{children}</CartContext.Provider>;
}
