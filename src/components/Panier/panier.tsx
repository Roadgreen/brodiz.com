import Image from "next/image"
import {useContext,useEffect} from 'react'
import styles from './panier.module.css'
import { useGlobalContextCart } from "@/app/Context/cartContext";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useGlobalContextAnalytics } from  '@/app/Context/analyticsContext'

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
    description: {short:string,long:string},
    color: Array<ColorObject>,
    size:Array<string>,
    category: Array<string>,
    tag: Array<string>,
    quantity:number,
    custom:Object
  }

 
export default function Cart() {
    const {sendPageview,sendEvent} = useGlobalContextAnalytics();
    const {cartItem,updatedCart,removeFromCart} = useGlobalContextCart();
    useEffect(()=>{
    
        sendPageview( {url: '',
        referrer: '',
        userAgent: '',
        visitorId: '',
        userId: '',
        sessionId: '',
        timeOnPage: new Date,
        screenResolution: '',
        product: {},
        pageCategory: 'Panier',
        data: {
            cartItem
        }});
      
  },[cartItem,sendPageview])
console.log(cartItem.length)
    const checkMap = (Cart:product[]) => (Cart.map((x:product) =>{
        console.log(x);
    return(
    <div key={x.id} className={styles.Articles}><Image alt={x.img[0][1]} src={x.img[0][0]} height={150} width={150}/>
    <div>
        <h4>{x.name}</h4>
        <p>{x.category[0]}</p>
    <p>{x.color[0].name}</p>
<p>{x.size}</p>
    <div>
    <label>Quantité: </label>

<select style={{width:50,height:20,fontSize:15}} onChange={e => handleChange(e.target.value,x.id)} name="quantity" id="quantity">
    <option value={x.quantity}>{x.quantity}</option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
</select>

    </div>
    </div>
    <div><p>{x.price}€ </p></div>
    <div onClick={e=>handleSup(x)}>
        <RiDeleteBin5Line/>
    </div>
    </div>
    )}))

    const handleChange = (x:string,y:string) => {
        sendEvent({ url: '',
        eventName: 'click',
        sessionId:'',
        data:{clickName : 'quantity_change',clickCategorie: 'Panier',product: y,product_quantity: x}})
        const products = cartItem;
        const idProduct = y;
        const productNewQuantity = x;
        const hisId = (f:any) => f.id === idProduct;
        const index = cartItem.findIndex(hisId);
        products[index].quantity = Number(productNewQuantity);
        updatedCart(products[index]);
        
    }
    const handleSup = (x:any) => {
        sendEvent({ url: '',
        eventName: 'click',
        sessionId:'',
        data:{clickName : 'remove_from_cart',clickCategorie: 'Panier',product: x.id}})
        removeFromCart(x)
        console.log(cartItem);
    }
  return (
    <div className={styles.Container}>
        <h2>Panier</h2>
        <div>
{cartItem.length > 0  ? checkMap(cartItem) : ''}
        </div>
    </div>
  )
}
