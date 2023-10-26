import { useEffect,useState } from 'react';
import styles from './commandes.module.css'
import { useGlobalContextCom } from '@/app/Context/commandeContext';
import Image from 'next/image';
function  Commandes(user:any){
    const [Command, setCommand] = useState([]);     console.log(user.user.email);
const {commandCheck} = useGlobalContextCom();
useEffect(() => {
    // Utilisez une fonction asynchrone pour appeler commandCheck
    const fetchCommand = async () => {
      try {
        const result = await commandCheck({ email: user.user.email });
        setCommand(result ? result : []); // Stockez les résultats dans le state
      } catch (err) {
        console.error(err);
        setCommand([]); // En cas d'erreur, videz le tableau
      }
    };

    // Appelez fetchCommand une fois que user.user.email est disponible
    if (user.user.email) {
      fetchCommand();
    }
  }, [user.user.email, commandCheck]);
    return (
        <div className={styles.Container}>
            <h1> Mes Commandes</h1>
{Command.map((item:any,i) => (
        <div key={i} className={styles.articles}>
        <div className={styles.imgContainer}><Image src={item.product[0].img[0][0]} alt={item.product[0].img[0][1]} fill/></div>
        <div className={styles.descripContainer}><p>Nombre de Produit: {item.product.length}</p></div>
        <div className={styles.buttonContainer}><span className={styles.button}>Voir la commande</span>
        <span className={styles.button}>Acheter un modèles similaires</span></div>
    </div>
    ))}
          
        </div>
    )
}


export default Commandes;