import { useGlobalContext } from "@/app/Context/cartContext"
import styles from './panierProductPage.module.css'

export default function PanierProductPage(){
const cartItem = useGlobalContext();

    return(
<div className={styles.container}>
    
</div>
    )
}