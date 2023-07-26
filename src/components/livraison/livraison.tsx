import { useContext,useState,useEffect} from 'react';
import { CartContext } from '../Function/cartContext';
import styles from './livraison.module.css'
import { useRouter } from 'next/navigation'
import { NextResponse } from "next/server";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

export default function LivraisonPart() {
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
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
const handleClick = async ()=>{
    console.log(adress);

    if(adress.adresse !== '' && adress.post !== '' && adress.ville !== '' && adress.pays !== ''){
       const check:any =  Cart?.AdressCheck(adress);
       console.log(adress);
       console.log(check);
       if(check){
      const params:any = {
        method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "application/json",},
      redirect: "follow",
      body: JSON.stringify({
        price: 'price_1NWM28FEy7LAuyEsdN3pM9C3',
        quantity: 1,
      })
      }

     const response:Response | void = await fetch('/api/stripe/create-checkout-session',params);

     const data = await response.json(); // Parse the JSON data from the response
        const checkoutURL = data.URL;
        console.log(checkoutURL);
        router.push(`${checkoutURL}`);
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
