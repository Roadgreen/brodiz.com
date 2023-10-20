"use client";
import { features } from "process";
import { useContext, createContext, useState,useEffect,SetStateAction,Dispatch } from "react";


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
  price_ID: string,
  description: string,
  color: Array<Object>,
  size:Array<string>,
  category: Array<string>,
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
  size:Array<string>,
  category: Array<string>,
  tag: string,
  quantity: number,
}[]
type CartContext = {
  addToCart: (products: product) => void; addedToCart:boolean; removeFromCart: (products: product) => void; updatedCart: (products: product) => void; cartItem: product[]; totalPrice: (products: any) => void;price: any;AdressCheck:(a:adresse)=>void;livPrice: number | undefined;tot: number;setAddedToCart:Dispatch<SetStateAction<boolean>>;
}

const product = [ prod];

export const CartContext = createContext<CartContext>(
  {} as CartContext
);


export default function CartContextProvider({children}:any) {
  const [cartItem, setCartItem] = useState<product[]>([]);
  const [addedToCart,setAddedToCart] = useState<boolean>(false);
  const [storedCart,setStoredCart] = useState([]);
  const [adress,setAdress] = useState({})
  const [price, setPrice] = useState<any>(0);
  const [livPrice,setLivPrice] = useState<number>(0);
  const [tot,setTot] = useState<number>(0);

  useEffect(() => {
    const storage: any = localStorage.getItem('cart');
    if (storage) {
      try {
        const parsedStorage = JSON.parse(storage);
        setStoredCart(parsedStorage || []);
          setCartItem(parsedStorage || []);
        
      } catch (error) {
        // Gérer une chaîne JSON invalide ou vide ici
        console.error('Erreur lors de la récupération du panier depuis le stockage local :', error);
      }
    }
  }, []);

  const addToCart = (productToAdd: product) => {
    console.log(productToAdd)
    const productToAddKey = `${productToAdd.id}-${productToAdd.color[0]}-${productToAdd.size[0]}`;
    const existingProductIndex = cartItem.findIndex((item: product) =>{
    const itemKey = `${item.id}-${item.color[0]}-${item.size[0]}`;
    return itemKey === productToAddKey;
    });
  console.log(existingProductIndex);
  if (existingProductIndex !== -1) {
    // Le produit existe déjà dans le panier, mettez à jour la quantité du produit existant
    const updatedCart = [...cartItem];
    updatedCart[existingProductIndex].quantity += productToAdd.quantity;
  
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItem(updatedCart);
      setAddedToCart(true);
      totalPrice(updatedCart);
    } else {
      // Le produit n'existe pas dans le panier, l'ajouter simplement
      const updatedCart = [...cartItem, productToAdd];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItem(updatedCart);
      setAddedToCart(true);
      totalPrice(updatedCart);
    }
  };
  
const removeFromCart = (products:product) => {
  
  const id = products.id;
const size = products.size;
function filterProduct(product:product){
  if(product.id === products.id && product.size === products.size){
    return false
  } else {
    return true
  }
}
  const updatedCart = cartItem.filter(filterProduct);
  localStorage.setItem('cart',JSON.stringify(updatedCart))
  setCartItem(updatedCart);
  totalPrice(updatedCart);
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
  setPrice(totalPrice);
AllPrice()
 
}
const updatedCart = (products:product) => {
  const id = products.id;
  const hisId = (x:product) => x.id === id;
  const ind = cartItem.findIndex(hisId);
  const updatedCart = cartItem.splice(ind,1,products);
  localStorage.setItem('cart',JSON.stringify(updatedCart))
  setCartItem(updatedCart);
  totalPrice(updatedCart);
  
}
  return <CartContext.Provider value={{
    addToCart,removeFromCart,updatedCart,cartItem,totalPrice,price,AdressCheck,livPrice,tot,addedToCart,setAddedToCart
  }}>{children}</CartContext.Provider>;
}
export const useGlobalContextCart = () => useContext(CartContext);