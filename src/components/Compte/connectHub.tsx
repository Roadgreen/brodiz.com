import {useContext,useState} from 'react'
import { UserContext } from '@/components/Function/UserAccountContext'
import styles from './connectHub.module.css'
import { useRouter } from 'next/navigation';

function ConnectHub() {
  const router = useRouter()
    const User = useContext(UserContext);

    console.log(User?.userFind);
    const handleClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const email = User.userEmail;
      const password = User.userPswd;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function isValidEmail(email:string) {
  return emailRegex.test(email);
}
//check if email is valid and user finded or not
if(isValidEmail(email) === true){
  console.log('dans le if isValidEmail');
  //check if need register or if need connect
  if(User?.userFind === 'Wait'){
    console.log('dans le if userFind = wait');
    const finded:any = await User?.FindUser({email,collection:'Client'});
    const {code,status} = finded;
    
    if(code === 404){
      //Now open the password panel
    } else if(code === 202){
    
    } else if(code === 1){
    
    }
  } else if(User?.userFind === 'connect'){
    console.log('dans le if userfind connect');
const connect:any = User?.Login({email,password,collection:'Client'})
  if(connect.code === 404){

  } else if(connect.code === 202){
    //TODO here we need to finish the connect mode 
  }
  } else if(User?.userFind === 'register'){
    console.log('dans le if userfind register');

    const news = User?.isNews;
    const date = new Date();

const register:any =  User?.CreateAccount({email,password,collection:'Client',newsletter: news, date: date.toString()})
const {code,status,id} = await register;
if(code === 202){
  console.log('dns le bon register code 202')
  router.push(`/account/${id}`);
} else if(code === 404){
  console.log('user non ajoutée 404')
}
  }

} else if(isValidEmail(email) === true && email === 'Admin@Admin.com'){
  const finded = User?.FindUser({email:email,collection:'Admin'});
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
    {User?.userFind === "register"? <> <p>S'inscrire à la newsletter : </p>
    <div className={styles.newsChecked}>
    <label>Oui</label>
    <input name='news' value={1} onChange={(e:any)=>{User?.setIsNews(e.target.value)}} checked type='radio'></input>
    <label>Non</label>
    <input value={2} onChange={(e:any)=>{User?.setIsNews(e.target.value)}} name='news' type='radio'></input> <div/> </div> </> : <></>}
   
   
    </>
  }
    <button onClick={e=>handleClick(e)} className={styles.button}>continuer</button>
      </form></div>
</div>
  )
}

export default ConnectHub