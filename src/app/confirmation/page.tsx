"use client"
import styles from '.page.module.css'
import Link from 'next/link';
import Stripe from 'stripe'
import { useSearchParams } from 'next/navigation'
import { useEffect,useState } from 'react'
import { useGlobalContextCart } from '../Context/cartContext';
import { useGlobalContextCom } from '@/app/Context/commandeContext';
import { useGlobalContextUser } from '../Context/UserAccountContext';


export default function Confirmation(){
    const [sucess,setSucess] = useState(false);
    const {cartItem} = useGlobalContextCart();
    const [user,setUser] = useState(true)
    const {commandAdd} = useGlobalContextCom();
    const {UserConnected} = useGlobalContextUser();

    useEffect(()=>{
        const checkUser = async () =>{
            const id = window.localStorage.getItem('userId') ?? '';
            try{
                const result = await UserConnected(id);
                if(result.code=== 200){
                setUser(true);
                } else{
                    setUser(false);
                }
            }catch(err){
                console.log(err);
            }
        }
        checkUser();
       
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
             console.log(data);
             const commandID = await localStorage.getItem('commandID');
             const command = {id:commandID,etat:'validé',userid:'',useremail: '',username: '',userlastname: '',adress:{adresse:'',post:'',ville:'',pays:''},product:[],livprice:data.shipping_cost , totalprice: data.total_product_price  }
           const result =   await commandAdd(command);
           if(result === 'ok'){
            localStorage.removeItem('commandID');
            localStorage.removeItem('cart');
           }
          }
          stripeRetrieve(id);
       
        }
    
        if (query.get('canceled')) {
            setSucess(false);
        }
    },[])
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