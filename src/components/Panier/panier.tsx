import Image from "next/image"
import {useContext} from 'react'
import styles from './panier.module.css'
import { useGlobalContextCart } from "@/app/Context/cartContext";
import { RiDeleteBin5Line } from 'react-icons/ri';

interface product {
    id: string,
    name: string,
    img: Array<string>,
    price:string,
    description: string,
    color: string,
    size:string,
    category: Array<string>,
    tag: string,
    quantity: number,
  }

 
export default function Cart() {
    const {cartItem,updatedCart,removeFromCart} = useGlobalContextCart();
console.log(cartItem.length)
    const checkMap = (Cart:product[]) => (Cart.map((x:product) =>{
    return(
    <div key={x.id} className={styles.Articles}><Image alt={x.img[0][1]} src={x.img[0][0]} height={150} width={150}/>
    <div>
        <h4>{x.name}</h4>
        <p>{x.category[0]}</p>
    <p>{x.color}</p>
    <div>
    <label>Quantité:</label>

<select onChange={e => handleChange(e.target.value,x.id)} name="quantity" id="quantity">
    <option value={x.quantity}>{x.quantity}</option>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
</select>
<label>Couleur:</label>

<select name="size" id="size">
<option value={x.size}>{x.size}</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select>
    </div>
    </div>
    <div><p>{x.price}€ </p></div>
    <div onClick={e=>handleSup(x)}>
        <RiDeleteBin5Line/>
    </div>
    </div>
    )}))

    const handleChange = (x:any,y:any) => {
        const product = cartItem;
        const hisId = (f:any) => f.id === y;
        const ind = cartItem.findIndex(hisId);
        product[ind].quantity = x;
        updatedCart(cartItem[ind]);
    }
    const handleSup = (x:any) => {
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
