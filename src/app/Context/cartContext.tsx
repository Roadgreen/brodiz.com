"use client";
import { features } from "process";
import { useContext, createContext, useState,useEffect,SetStateAction,Dispatch } from "react";



interface ColorObject {
  color: string;
  name: string;
}
interface product {
  id: string,
  name: string,
  img: Array<[string,string]>,
  price:number,
  notes:number,
  price_ID: string,
  description: {
    short:string,
    long:string
},
  color: Array<ColorObject>,
  size:Array<string>,
  category: Array<string>,
  tag: Array<string>,
  quantity:number,
  custom:Object
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
  description: {
    short:string,
    long:string
},
  color: string,
  size:Array<string>,
  category: Array<string>,
  tag: string,
  quantity: number,
  custom:Object
}[]
type CartContext = {
  addToCart: (products: product) => void;cartCheck: () => number; addedToCart:boolean; removeFromCart: (products: product) => void; updatedCart: (products: product) => void; cartItem: product[]; totalPrice: (products: any) => void;price: any;AdressCheck:(a:adresse)=>Promise<boolean>;livPrice: number | undefined;tot: number;setAddedToCart:Dispatch<SetStateAction<boolean>>;
}



export const CartContext = createContext<CartContext>(
  {} as CartContext
);


export  function CartContextProvider({children}:any) {
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

const AdressCheck = (a:adresse): Promise<boolean> => {
  console.log(a)
  const remoAccent = removeAccents(a.adresse);
  const add = remoAccent.replace(/\s+/g, "+")
  const url = `https://api-adresse.data.gouv.fr/search/?q=${add}&postcode=${a.post}`
  
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res: Response) => res.json())
      .then((data: any) => {
        console.log(data)
        const features = data.features;
console.log(features);
        if (features && features.length === 0) {
          // Aucune correspondance trouvée
          resolve(false);
        } else if (features && features.length > 1) {
          // Une seule correspondance trouvée
          const Add = features[0].properties;
          setAdress({city:Add.city,postcode: Add.postcode,street:Add.street,housenumber:Add.housenumber});
          resolve(true);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

const AllPrice = () => {
  const formattedTot = (price + livPrice).toFixed(2);
  setTot(parseFloat(formattedTot));
};
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
        setLivPrice(8.80);
        break;
        case 2:
          setLivPrice(10.15);
          break;
          case 3: 
          setLivPrice(10.15);
          case 4: setLivPrice(15);
          break;
          case 5 : setLivPrice(15);
          break;
          default: setLivPrice(15);
    }
  }
  livraison()
  setPrice(totalPrice);
AllPrice()
 
}
const updatedCart = (products:product) => {
  const updatedCart = cartItem;
  const id = products.id;
  const hisId = (x:product) => x.id === id;
  const ind = updatedCart.findIndex(hisId);
  console.log(ind);
  updatedCart.splice(ind,1,products);
  console.log(updatedCart);
  localStorage.setItem('cart',JSON.stringify(updatedCart))
  setCartItem(updatedCart);
  totalPrice(updatedCart);
}
const cartCheck = () =>{
let quantity = 0;
for(var i = 0;i < cartItem.length; i++){
return quantity += cartItem[i].quantity;
}
console.log(quantity);
return quantity
 
}
  return <CartContext.Provider value={{
    addToCart,cartCheck,removeFromCart,updatedCart,cartItem,totalPrice,price,AdressCheck,livPrice,tot,addedToCart,setAddedToCart
  }}>{children}</CartContext.Provider>;
}
export const useGlobalContextCart = () => useContext(CartContext);