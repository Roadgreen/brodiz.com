import React, { useEffect, useState } from 'react'
import styles from './profil.module.css'
import { useGlobalContextCart } from '@/app/Context/cartContext'
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';
import { redirect, useSearchParams } from 'next/navigation';
import { useGlobalContextAnalytics } from '@/app/Context/analyticsContext';

export default function Profil(user:any) {
  const{AdressCheck} = useGlobalContextCart();
  const {UserChanges} = useGlobalContextUser();
  const {sendEvent} = useGlobalContextAnalytics();
  const [modif,setModif] = useState(true);
  const[modifOk,setModifOk] = useState(false);
  const [adress,setAdress] = useState({adresse:'',post:'',ville:'',pays:''});
  const [name,setName] = useState({name:'',lastname:''});
console.log(user.user.email)
useEffect(()=>{
  if(user && user.user.adress){
setAdress({adresse:user.user.adress[0].adresse,post:user.user.adress[0].postalcode,ville:user.user.adress[0].ville,pays:user.user.adress[0].pays})
  }
},[user])
//TODO ici dans le profil ne pas oublier de changer le user en useState pour prendre en compte les modification apporter par l'utilisateur et vérifier les infos avec un useeffect pour rentrer les infos user dans le usestate
const handleChangeAdd = (e:string,n:any)=>{

  setAdress(adress => ({
      ...adress,
      [n]: e,
  }))
  
  }
  const handleChangeName = (e:string,n:any)=>{

    setName(name => ({
        ...name,
        [n]: e,
    }))
    
    }
const handleClick = async () =>{
  if(name.name !== '' && name.lastname !== '' && adress.adresse !== '' && adress.pays !== '' && adress.post !== '' && adress.ville !== ''){
    const check:any = AdressCheck(adress);
    const add = [{adresse: adress.adresse.toLowerCase(),post:adress.post.toLowerCase(),ville:adress.ville.toLowerCase(),pays:adress.pays.toLowerCase()}]
    const userN = {adress:add,email:user.user.email, name:name.name.toLowerCase(), lastname: name.lastname.toLowerCase() }
    if(check){
   
      try {
        const response = await UserChanges(userN);
        console.log('UserChanges executed, response:', response);
        if(response){
          sendEvent({ url: '',
          eventName: 'click',
          sessionId:'',
          data:{clickName : 'Modifier_adresse',clickCategorie: 'account',user_Id: user.user.id}})
          console.log('dans le handleclick')
        
          setModifOk(true)
          redirect(`account/${user.user._id}`)
        }
        // Faites ici ce que vous voulez faire après l'exécution de UserChanges
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'exécution de UserChanges :', error);
      }
    }
  } else {
    
  }

  

}

  return (
    <div className={styles.container}>
        


<div className={styles.changeContainer}>
    <h3>Besoin de modifier votre profil?</h3>
    {modif ? (<div className={styles.Form}><div><input onChange={(e)=>{handleChangeName(e.target.value,'lastname')}}  placeholder={user.user.lastname ? user.user.lastname: 'Nom'}/>
    <input  onChange={(e)=>{handleChangeName(e.target.value,'name')}} placeholder={user.user.name ? user.user.name : 'Prénom'}/></div>
   <div><input onChange={(e)=>{handleChangeAdd(e.target.value,'adresse')}} placeholder={adress.adresse ? adress.adresse : 'Adresse'}/>
    <input onChange={(e)=>{handleChangeAdd(e.target.value,'post')}} placeholder={adress.post ? adress.post : 'Code Postal'}/></div> 
   <div><input onChange={(e)=>{handleChangeAdd(e.target.value,'ville')}} placeholder={adress.ville ? adress.ville : 'Ville'}/>
    <input onChange={(e)=>{handleChangeAdd(e.target.value,'pays')}} placeholder={adress.pays ? adress.pays : 'Pays'}/></div>
    <button className={styles.button} onClick={()=>{handleClick()}}>Modifier</button>
     </div>
    
    ) :  <button className={styles.button}>Modifier mon profil</button>}
   
</div></div>

  
  )
}
