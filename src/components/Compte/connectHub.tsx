'use client'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './connectHub.module.css';
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';
import { useGlobalContextAnalytics } from '@/app/Context/analyticsContext';

function ConnectHub({Cookie}:{Cookie:any}) {
  const [validateEmail,setValidateEmail] = useState(true);
  const {sendEvent} = useGlobalContextAnalytics();
  const router = useRouter();
  const {userEmail,userData,userPswd,UserConnected,FindUser,userFind,Login,setUserData,setUserPswd,isNews,CreateAccount,setUserEmail} = useGlobalContextUser();

useEffect(()=>{

  const id = localStorage.getItem('userId');
console.log(id);
if(id !== undefined && id !== null){
  const connected = UserConnected(id);
  console.log(userFind,'consoleloguserfind')
  console.log(connected);
  connected.then((res:any)=>{
    console.log(res.code)
    if(res.code === 200){
      router.push(`/account/${id}`);
    }
  }
    
  )
}
})



  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'continuer',clickCategorie: 'account'}})
    e.preventDefault();
    const email = userEmail;
    const password = userPswd;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    function isValidEmail(email: string) {
      return emailRegex.test(email);
    }
  
    if (!isValidEmail(email)) {
      
      setValidateEmail(false);
      return; // Exit early if the email is invalid or it is the Admin user.
    }else{
      if (email === 'Admin@Admin.com') {
       const finded = await FindUser({ email: email, collection: 'Admin', })
        console.log(finded);
        let code, id,user;
        const connectAdmin: any = await Login({ email, password, collection: 'Admin' });
 ({ code, id , user} = await connectAdmin) 
 console.log('console connectHub , user.cookie, Cookie' ,'Ici user.cookie>', user.cookie ,'Ici le props>', Cookie)
user.cookies === Cookie.value ?   router.push(`/account/${id}`) :   console.log('connecthub le routerpush ne ce fait pas.')


  

        
      
      } else {
        let code, id,user; // Declare the variables here to avoid redeclaration

        switch (userFind) {
          case 'Wait':
            const finded: any = await FindUser({ email, collection: 'Client' });
            break;
          
          case 'connect':
            const connect: any = await Login({ email, password, collection: 'Client' });
            ({ code, id , user} = await connect); 
            // Assign the values here, don't redeclare
            switch (code) {
              case 404:
                // Test point: Code 404 handling
                break;
      
              case 202:
                // Test point: Code 202 handling
                console.log(id);
                await setUserData(user);
                await localStorage.setItem("userId",id);
                console.log(await userData)
                router.push(`/account/${id}`);
                break;
      
              default:
                // Handle other codes here, if needed.
                break;
            }
            break;
      
          case 'register':
            
            const news = isNews;
            const date = new Date();
            const register: any = CreateAccount({
              email,
              password,
              collection: 'Client',
              newsletter: news,
              date: date.toString(),
            });
            ({ code, id } = await register); // Assign the values here, don't redeclare
            switch (code) {
              case 202:
                // Test point: Successfully registered, navigate to the account page
                router.push(`/account/${id}`);
                break;
      
              case 404:
                // Test point: Failed to add user, code 404 handling
                break;
      
              default:
                // Handle other codes here, if needed.
                break;
            }
            break;
      
          default:
            // Handle other userFind values here, if needed.
            break;
        }
      }
      setValidateEmail(true)
    }
  
 
  };
  
  return (
    <div className={styles.Container}>
      <h1>Mon compte</h1>
      <div className={styles.formContainer}>
        <form>
          {userFind === 'register'? <p>Bienvenue chez Brodiz, créez un compte pour continuer</p> : <p>Indiquez votre email pour l&apos;inscription ou vous connecter</p>}
          <div className={styles.InputContainer}>
            <input
              onChange={(e: any) => {
                setUserEmail(e.target.value);
              }}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              required
            />
            <span className={styles.spanFoc}>Email</span>
          </div>
          {validateEmail === false ?( <p>Il y a une erreur avec votre email</p>) : ''}
          {userFind === 'Wait' ? (
            <></>
          ) : (
            <>
              <div className={styles.InputContainer}>
                <input type='password'  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" onChange={(e:any)=>{setUserPswd(e.target.value)}}  required />
                <span className={styles.spanFoc}>Mdp</span>
              </div>
              <div onClick={()=>{}} className={styles.forgetMdp}><p>Mot de passe oublié ?</p></div>
              {userFind === 'register' ? (
                <>
                  <p>S&apos;inscrire à la newsletter :</p>
                  <div className={styles.newsChecked}>
                   
                    <label className={styles.switch}>
  <input type="checkbox"/>
  <span className={styles.slider}></span>
</label>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
          <button onClick={(e) => handleClick(e)} className={styles.button}>
            continuer
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConnectHub;
