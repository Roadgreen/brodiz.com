import React from 'react'
import { useContext,useState} from 'react';
import { CartContext } from '../Function/cartContext';
import styles from './livraison.module.css'
import { useRouter } from 'next/navigation'

export default function LivraisonPart() {
    const router = useRouter()
    const Cart = useContext(CartContext);
    const [adress,setAdress] = useState({adresse:'',post:'',ville:'',pays:''})
    const [addOk,setAddOk] = useState(false);

const handleChange = (e:string,n:any)=>{

setAdress(adress => ({
    ...adress,
    [n]: e,
}))

}
const handleClick = ()=>{
    console.log(adress);

    if(adress.adresse !== '' && adress.post !== '' && adress.ville !== '' && adress.pays !== ''){
       const check:any =  Cart?.AdressCheck(adress);
       console.log(adress);
       console.log(check);
       if(check){
        console.log('suite')
        router.push('/paiement')
       }
    }else {
        console.log('not ok adress')
        setAddOk(true);
    }
}
  return (
    <div className={styles.Container}>
        <div className={styles.SecondContainer}>
        <div>
    <h3>Livraison</h3>
</div>
<div>
    <form className={styles.Form}>
        <div>
        <input placeholder='Prénom' onChange={e => setAdress(address=>({...address,}))}></input>
        <input placeholder='Nom'></input>
        </div>
        <div>
        <input placeholder='Adresse' onChange={e => handleChange(e.target.value,'adresse')}></input>
        <input placeholder='Ville' onChange={e => handleChange(e.target.value,'ville')}></input>
        </div>  
        <div>
        <input placeholder='Code postal'onChange={e => handleChange(e.target.value,'post')}></input>
        <input placeholder='Pays' onChange={e => handleChange(e.target.value,'pays')}></input>
        </div>  
        <div>
        <input placeholder='Email'></input>
        <input placeholder='Numéro de téléphone(optionnel)'></input>
        </div>
    </form>
   {addOk? <div className={styles.Wrongad}><p>Veuillez vérifier votre adresse!</p></div> : <></>}
</div>
<button className={styles.Button} onClick={()=>{handleClick()}} >Allez au paiement</button>
        </div>
        </div>
  )
}
