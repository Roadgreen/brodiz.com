"use client"
import styles from '.page.module.css'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useEffect,useState } from 'react'
import { useGlobalContextCart } from '../Context/cartContext';

export default function Confirmation(){
    const [sucess,setSucess] = useState(false);
    const {cartItem} = useGlobalContextCart();
    const [user,setUser] = useState(true)
    useEffect(()=>{
        console.log(cartItem)
        if(window.localStorage.getItem('userId')){
            setUser(true);
        } else {
            setUser(false);
        }
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          setSucess(true);
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