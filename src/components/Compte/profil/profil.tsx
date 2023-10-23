import React from 'react'
import styles from './profil.module.css'

export default function Profil(user:any) {
console.log(user.user.email)

  return (
    <div className={styles.container}>
        <h1>Profil</h1>
<div className={styles.InfoContainer}>
    <h4>Nom</h4>
<p>{user.user.name}</p>
<h4>Prénom</h4>
<p>{user.user.lastname}</p>
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
    <button className={styles.button}>Modifier mon profil</button>
</div>
    </div>
  )
}
