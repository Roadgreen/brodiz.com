'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useGlobalContextUser } from '../Context/UserAccountContext';
import LivraisonPart from '@/components/livraison/livraison';
import CartLivraison from '@/components/livraison/CartLivraison/cartLivraison';
import styles from './page.module.css'


interface User {
  id: string,
  email: string,
  username: string,
  password:string,
  collection: string,
  date: string,
  newsletter: number,
  adress:Array<Object>,
  name: string,
  surname: string
  } 
export default function Livraison() {
  const { UserConnected } = useGlobalContextUser();
  const [userConnected, setUserConnected] = useState(false);
  const [user,setUser] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    
    if (userId) {
      // Appel de la fonction UserConnected pour vérifier la connexion
      UserConnected(userId)
        .then((result) => {
          if (result.code === 200) {
            setUser(result.user);
            // L'utilisateur est connecté
            setUserConnected(true);
          } else if(result.code === 404) {
            // L'utilisateur n'est pas connecté
            console.log(404)
            setUserConnected(false);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la vérification de la connexion :", error);
          setUserConnected(false); // En cas d'erreur, considérez l'utilisateur comme non connecté
        });
    } else {
      // Si userId n'est pas défini dans localStorage, l'utilisateur n'est pas connecté
      setUserConnected(false);
    }
  }, [UserConnected]);

  return (
    <>
    <h1 className={styles.h1}>Livraison</h1>
     <div className={styles.Container}>
      
      {userConnected ? (
        // Si l'utilisateur est connecté, affichez les composants LivraisonPart et CartLivraison
        <LivraisonPart User={user} />
      ) : (
        // Si l'utilisateur n'est pas connecté, vous pouvez afficher un message ou rediriger vers la page de connexion
        <LivraisonPart User={''} />
          
      )}
      <CartLivraison />
    </div>
    </>
   
  );
}

