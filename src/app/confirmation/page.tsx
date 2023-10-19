"use client"
import styles from '.page.module.css'
import Link from 'next/link';
import Stripe from 'stripe'
import { useSearchParams } from 'next/navigation'
import { useEffect,useState } from 'react'
import { useGlobalContextCart } from '../Context/cartContext';
import { useGlobalContextCom } from '@/app/Context/commandeContext';


export default function Confirmation(){
    const [sucess,setSucess] = useState(false);
    const {cartItem} = useGlobalContextCart();
    const [user,setUser] = useState(true)
    const {commandAdd} = useGlobalContextCom();

    useEffect(()=>{
        console.log(cartItem)
        if(window.localStorage.getItem('userId')){
            setUser(true);
        } else {
            setUser(false);
        }
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('on est dans le sucess')
          setSucess(true);
          const id = query.get('session_id');
          const stripeRetrieve = async (id:any) =>{
            const params:any = {
                method: "POST",
              mode: "no-cors",
              headers: {"Content-Type": "application/json",},
              redirect: "follow",
              body: JSON.stringify({
               id
              })
              }
            const response:Response | void = await fetch('/api/stripe/retrieve-stripe-session',params);
             const data = await response.json();
             const command = {userid:'',useremail: '',username: '',userlastname: '',adress:{adresse:'',post:'',ville:'',pays:''},product:[],livprice:data , totalprice: 0  }
          commandAdd(command);
          }
          stripeRetrieve(id);
       
        }
    
        if (query.get('canceled')) {
            setSucess(false);
        }
    },[cartItem])
    return (<>
    {sucess && user? (<div>
        <div><h1>Merci!</h1></div>
<div><p>Votre commande arrive bientôt.</p></div>
    </div>) : '' }
    {sucess && !user ? (<div>
        <div><h1>Merci!</h1></div>
        <div><h3>Créez votre compte utilisateur pour suivre votre commande: </h3>
        <Link href={'/account'}>Créer mon compte</Link>
        </div>

    </div>) : ''}
    </>
        
    )
}