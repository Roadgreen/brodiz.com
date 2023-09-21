"use client";
import { features } from "process";
import { useContext, createContext, useState,useEffect } from "react";


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
interface product {
  id: string,
  name: string,
  img: Array<string>,
  price:string,
  description: string,
  color: string,
  size:string,
  category: string,
  tag: string,
  quantity: number,
}
interface adresse {
  adresse: string;
  ville: string;
  post:string;
  pays: string;
}

interface products {
    id: string,
  name: string,
  img: Array<string>,
  price:string,
  description: string,
  color: string,
  size:string,
  category: string,
  tag: string,
  quantity: number,
}[]
type CartContext = {
  addToCart: (products: product) => void; removeFromCart: (products: product) => void; updatedCart: (products: product) => void; cartItem: product[]; totalPrice: (products: any) => void;price: any;AdressCheck:(a:adresse)=>void;livPrice: number | undefined;tot: number;
}

const product = [ prod];

export const CartContext = createContext<CartContext>(
  {} as CartContext
);


export default function CartContextProvider({children}:any) {
  const [cartItem, setCartItem] = useState<product[]>([]); //TODO problème de format ici entre product et products. 
  const [storedCart,setStoredCart] = useState([]);
  const [adress,setAdress] = useState({})
  const [price, setPrice] = useState<any>(0);
  const [livPrice,setLivPrice] = useState<number>(0);
  const [tot,setTot] = useState<number>(0);

  useEffect(()=>{
    const storage:any = localStorage.getItem('cart');
    setStoredCart(JSON.parse(storage) || []);
  },[setStoredCart])

  const addToCart = (productToAdd: product) => {
    const existingProduct = cartItem.find((item: product) =>
    item.id === productToAdd.id && //TODO ici problème de type à résoudre pour pouvoir utiliser la fonction. 
    item.color === productToAdd.color &&
    item.size === productToAdd.size
  );
  if(existingProduct){
    const updatedCart = cartItem.map((item: product) =>
    item.id === productToAdd.id && item.color === productToAdd.color && item.size === productToAdd.size
      ? { ...item, quantity: item.quantity + productToAdd.quantity }
      : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  setCartItem(updatedCart);
  }else{
    const updatedCart = [...cartItem, productToAdd];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItem(updatedCart);
  }
    
    
   
  };
  
const removeFromCart = (products:product) => {
  const id = products.id; 
  const updatedCart = cartItem.filter((item: product) => item.id !== id);
  localStorage.setItem('cart',`${updatedCart}`)
  setCartItem(updatedCart);

  console.log(cartItem)
}
function removeAccents(str:string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const AdressCheck = (a:adresse) => {
  console.log(a)
  const remoAccent = removeAccents(a.adresse);
  const add = remoAccent.replace(/\s+/g, "+")
  const url = `https://api-adresse.data.gouv.fr/search/?q=${add}&postcode=${a.post}`
  return fetch(url)
  .then((res: Response) => res.json()) // Convertir la réponse en JSON
  .then((data: any) => {
    console.log(data)
    const features = data.features; // Extraire les features de la réponse

    if (features && features.length === 0) {
      // Vérifier si les features existent et ont une longueur supérieure à 0
      // Faire le traitement approprié ici
      return false;
    } else if (features && features.length === 1) {
      const Add = features[0].properties;
      setAdress({city:Add.city,postcode: Add.postcode,street:Add.street,housenumber:Add.housenumber})
      return true;
    }
  })
  .catch((err) => console.log(err));
}
const AllPrice = () => {
 return setTot(price + livPrice);
}
const totalPrice =  (products:any) => {
  let totalPrice = 0;
  let quant = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const { quantity, price } = product;

    totalPrice += quantity * price;
    quant += quantity;
  }
  const livraison = () => {
    switch (quant){
      case 1:
        setLivPrice(6.70);
        break;
        case 2:
          setLivPrice(8.25);
          break;
          case 3: 
          setLivPrice(9.55);
          case 4: setLivPrice(9.55);
          break;
          case 5 : setLivPrice(14.65);
          break;
          default: setLivPrice(14.65);
    }
  }
  livraison()
AllPrice()
 setPrice(totalPrice);
}
const updatedCart = (products:product) => {
  const id = products.id;
  const hisId = (x:product) => x.id === id;
  const ind = cartItem.findIndex(hisId);
  const newCart = cartItem.splice(ind,1,products);
  setCartItem(newCart);
}
  return <CartContext.Provider value={{
    addToCart,removeFromCart,updatedCart,cartItem,totalPrice,price,AdressCheck,livPrice,tot,
  }}>{children}</CartContext.Provider>;
}
export const useGlobalContext = () => useContext(CartContext);