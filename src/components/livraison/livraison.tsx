import { useContext,useState,useEffect} from 'react';
import { useGlobalContextCart } from '@/app/Context/cartContext';
import { useGlobalContextCom } from '@/app/Context/commandeContext';
import styles from './livraison.module.css'
import { useRouter } from 'next/navigation'
import { NextResponse } from "next/server";
import { loadStripe } from '@stripe/stripe-js';
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';

interface User {
  email: string,
  username: string,
  password:string,
  collection: string,
  date: string,
  newsletter: number,
  adress:Array<{
    number:string,
  street:string,
  city:string,
  cityCode: string,
  country: string
  }>,
  name: string,
  surname: string
  }

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

export default function LivraisonPart(User:{User:User}) {
  const {AdressCheck,livPrice,tot,price} = useGlobalContextCart();
  const {commandAdd} = useGlobalContextCom();
  const [connected,setConnected] = useState(false);
  const [sameAdress,SetSameAdress] = useState(true);

    useEffect(() => {
      console.log(User.User.email);
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
        if(User){
setConnected(true);
        }
      }, []);
    const router = useRouter()
    const [adress,setAdress] = useState({adresse:'',post:'',ville:'',pays:''})
    const [command,setCommand] = useState({UserEmail:'',
      UserName: '',
      UserLastname: '',
      UserId: '', 
      Product: [{}],
      LivraisonPrice:0,
      TotalPrice: 0,Adress:{adresse:'',post:'',ville:'',pays:'',}})
    const [addOk,setAddOk] = useState(false);


    
const handleChangeAdd = (e:string,n:any)=>{

setAdress(adress => ({
    ...adress,
    [n]: e,
}))

}
const handleClick = async ()=>{
    console.log(adress);

    if(adress.adresse !== '' && adress.post !== '' && adress.ville !== '' && adress.pays !== ''){
       const check:any =  AdressCheck(adress);
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
    }else if(connected){
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
        if(checkoutURL.includes('sucess')){
          const command = {}
          commandAdd() //TODO finir la commandadd. Il faut linker le form au cammand add pour obtenir toutes les infos. 
        }
        router.push(`${checkoutURL}`);
    
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
  {User && User.User && User.User.adress &&  sameAdress ? <div className={styles.ContainerLivCon}>
    <button className={styles.buttonOn} onClick={()=>{SetSameAdress(false)}}>Changer mon adresse</button>
    <div>
    <p>{User.User.adress[0].number}</p>
    <p>{User.User.adress[0].street}</p>
    <p>{User.User.adress[0].city}</p>
    <p>{User.User.adress[0].cityCode}</p>
    </div>
  </div> :   <form className={styles.Form}>
        <div>
        <input placeholder='Prénom' ></input>
        <input placeholder='Nom'></input>
        </div>
        <div>
        <input placeholder='Adresse postale' onChange={e => handleChangeAdd(e.target.value,'adresse')}></input>
        <input placeholder='Ville' onChange={e => handleChangeAdd(e.target.value,'ville')}></input>
        </div>  
        <div>
        <input placeholder='Code postal'onChange={e => handleChangeAdd(e.target.value,'post')}></input>
        <input placeholder='Pays' onChange={e => handleChangeAdd(e.target.value,'pays')}></input>
        </div>  
        <div>
        <input placeholder='Email'></input>
        <input placeholder='Numéro de téléphone(optionnel)'></input>
        </div>
    </form>}
   {addOk? <div className={styles.Wrongad}><p>Veuillez vérifier votre adresse!</p></div> : <></>}
</div>
<button className={styles.Button} onClick={()=>{handleClick()}} >Allez au paiement</button>
        </div>
        </div>
  )
}
