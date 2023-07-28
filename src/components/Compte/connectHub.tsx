import {useContext,useState} from 'react'
import { UserContext } from '@/components/Function/UserAccountContext'
import styles from './connectHub.module.css'

function ConnectHub() {
    const User = useContext(UserContext);
    console.log(User?.userFind);
    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const email = User.userEmail;
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email:string) {
  return emailRegex.test(email);
}

if(isValidEmail(email) === true){
const finded = User?.FindUser({email,collection:'Client'});
console.log('dans le hub reponse',finded)
} else if(isValidEmail(email) === true && email === 'Admin@Admin.com'){
  const finded = User?.FindUser({email,collection:'Admin'});
console.log('dans le hub reponse',finded)
}
    }

  return (
    <div className={styles.Container}>
        <h1>Mon compte</h1>
  <div className={styles.formContainer}><form>
    <p>Indiquez votre email pour l'inscription ou vous connecter</p>
    <div className={styles.InputContainer}>
    <input onChange={(e:any)=>{User?.setUserEmail(e.target.value)}} pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"  required></input>
    <span className={styles.spanFoc}>Email</span>
    </div>
    {User?.userFind === "Wait" ? <></>  : 
    <>
    <div className={styles.InputContainer}>
    <input pattern="[a-zA-Z]+" required ></input>
    <span className={styles.spanFoc}>Mdp</span>
    </div>
    <p>S'inscrire à la newsletter : </p>
    <div className={styles.newsChecked}>
    <label>Oui</label>
    <input name='news' checked type='radio'></input>
    <label>Non</label>
    <input name='news' type='radio'></input>
    </div>
    </>
  }
    <button onClick={e=>handleClick(e)} className={styles.button}>continuer</button>
      </form></div>
</div>
  )
}

export default ConnectHub