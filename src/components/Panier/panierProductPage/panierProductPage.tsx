import { useGlobalContext } from "@/app/Context/cartContext"
import styles from './panierProductPage.module.css'
import Image from "next/image"
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

export default function PanierProductPage(){
const { cartItem }: { cartItem: product[] } = useGlobalContext();
const dernierArticle = cartItem[cartItem.length - 1];

    return(
<div className={styles.container}>
    <div className={styles.containerLastArticle}>
    <div>
        <h3>Votre Panier</h3>
        <Image src={dernierArticle.img[0][0]} alt={dernierArticle.img[0][1]} fill />
    </div>
    <div>
        <p>{dernierArticle.name}</p>
        <p>{dernierArticle.price}</p>
        <p>{dernierArticle.size}</p>
        <p>Quantité: {dernierArticle.quantity}</p>
    </div>
    </div>
    <div>
        <div><p>Afficher mon panier</p></div>
        <div><p>Paiement</p></div>
    </div>
</div>
    )
}