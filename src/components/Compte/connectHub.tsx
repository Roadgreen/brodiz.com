import { useContext } from 'react';
import { UserContext } from '@/app/Context/UserAccountContext';
import { useRouter } from 'next/navigation';
import styles from './connectHub.module.css';
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';
import { useGlobalContextAnalytics } from '@/app/Context/analyticsContext';

function ConnectHub() {
  const {sendEvent} = useGlobalContextAnalytics();
  const router = useRouter();
  const {userEmail,userData,userPswd,FindUser,userFind,Login,setUserData,isNews,CreateAccount,setUserEmail} = useGlobalContextUser();

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
      if (email === 'Admin@Admin.com') {
        const finded = FindUser({ email: email, collection: 'Admin' });
        // Test point: Admin user found
      }
      return; // Exit early if the email is invalid or it is the Admin user.
    }
  
    let code, id,user; // Declare the variables here to avoid redeclaration
  
    switch (userFind) {
      case 'Wait':
        const finded: any = await FindUser({ email, collection: 'Client' });
        break;
  
      case 'connect':
        const connect: any = await Login({ email, password, collection: 'Client' });
        ({ code, id , user} = await connect); // Assign the values here, don't redeclare
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
          {userFind === 'Wait' ? (
            <></>
          ) : (
            <>
              <div className={styles.InputContainer}>
                <input pattern="[a-zA-Z]+" required />
                <span className={styles.spanFoc}>Mdp</span>
              </div>
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
