import React, { useState } from 'react'
import styles from './profil.module.css'
import { useGlobalContextCart } from '@/app/Context/cartContext'
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';
import { useSearchParams } from 'next/navigation';

export default function Profil(user:any) {
  const{AdressCheck} = useGlobalContextCart();
  const {UserChanges} = useGlobalContextUser();
  const [modif,setModif] = useState(true);
  const[modifOk,setModifOk] = useState(false);
  const [adress,setAdress] = useState({adresse:'',post:'',ville:'',pays:''});
  const [name,setName] = useState({name:'',lastname:''});
console.log(user.user.email)
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
  console.log('dans le handleclick')

  const check:any = AdressCheck(adress);
  const add = [{adresse: adress.adresse.toLowerCase(),post:adress.post.toLowerCase(),ville:adress.ville.toLowerCase(),pays:adress.ville.toLowerCase()}]
  const userN = {adress:add,email:user.user.email, name:name.name.toLowerCase(), lastname: name.lastname.toLowerCase() }
if(check){
   
  try {
    const response = await UserChanges(userN);
    console.log('UserChanges executed, response:', response);
    if(response){
      setModifOk(true)
      
    }
    // Faites ici ce que vous voulez faire après l'exécution de UserChanges
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'exécution de UserChanges :', error);
  }
}
}

  return (
    <div className={styles.container}>
        <h1>Profil</h1>
        <div className={styles.containerProfil}><div className={styles.InfoContainer}>
    <h4>Nom</h4>
<p>{user.user.name ? user.user.name : 'Renseigner votre prénom'}</p>
<h4>Prénom</h4>
<p>{user.user.lastname ? user.user.lastname : 'Renseigner votre nom'}</p>
<h4>email</h4>
<p>{user.user.email}</p>
<h4>adresse</h4>
{user.user.adress ? <><p>{user.user.adress[0].adresse}</p>
<p>{user.user.adress[0].postalcode}</p>
<p>{user.user.adress[0].ville}</p>
<p>{user.user.adress[0].pays}</p></> : '' }

</div>
<div className={styles.changeContainer}>
    <h3>Besoin de modifier votre profil?</h3>
    {modif ? (<div className={styles.Form}><div><input onChange={(e)=>{handleChangeName(e.target.value,'lastname')}}  placeholder={'Nom'}/>
    <input  onChange={(e)=>{handleChangeName(e.target.value,'name')}} placeholder={'Prénom'}/></div>
   <div><input onChange={(e)=>{handleChangeAdd(e.target.value,'adresse')}} placeholder={'Adresse'}/>
    <input onChange={(e)=>{handleChangeAdd(e.target.value,'post')}} placeholder={'Code Postal'}/></div> 
   <div><input onChange={(e)=>{handleChangeAdd(e.target.value,'ville')}} placeholder={'Ville'}/>
    <input onChange={(e)=>{handleChangeAdd(e.target.value,'pays')}} placeholder={'Pays'}/></div>
    <button onClick={()=>{handleClick()}}>Modifier</button>
     </div>
    
    ) :  <button className={styles.button}>Modifier mon profil</button>}
   
</div></div>

    </div>
  )
}
