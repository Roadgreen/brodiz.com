import { useGlobalContextCart } from "@/app/Context/cartContext"
import styles from './panierProductPage.module.css'
import Image from "next/image"
import Link from "next/link";

interface ColorObject{
    name:string,
    color:string
}
interface product {
    id: string,
    name: string,
    img: [string, string][],
    price:number,
    description: {short:string,long:string},
    color: ColorObject[],
    size:Array<string>,
    category: Array<string>,
    tag: string[],
    quantity: number,
    custom:Object
  }

export default function PanierProductPage(){
const { cartItem }: { cartItem: product[] } = useGlobalContextCart();
const dernierArticle = cartItem[cartItem.length - 1];


    return(
<div className={styles.container}>
<h3>Votre Panier</h3>
<div className={styles.button}>
        <Link style={{textDecoration:'none'}} className={styles.buttonL} href={'/panier'}><p>Afficher mon panier</p></Link>
        <Link  style={{textDecoration:'none'}} className={styles.buttonL} href={'/panier'}><p>Paiement</p></Link>
    </div>
<div className={styles.containerArticle}>
    {
cartItem.map((x:any,i:number)=>{
    console.log(x.size)
    return( <div key={i} className={styles.containerLastArticle}>
   

        <div className={styles.imgContainer}>
            <Image src={x.img[0][0]} alt={x.img[0][1]} fill />
        </div>
        <div className={styles.prodDesc}>
            <p>{x.name}</p>
            <p>{x.price}€</p>
            <p>{x.size[0] === "Taille Unique" ? "T/U" : x.size}</p>
            <p>Quantité: {x.quantity}</p>
        </div>
        </div>)
})
    }
   
   
    </div>
   
</div>
    )
}