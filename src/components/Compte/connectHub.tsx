import { useContext } from 'react';
import { UserContext } from '@/app/Context/UserAccountContext';
import { useRouter } from 'next/navigation';
import styles from './connectHub.module.css';

function ConnectHub() {
  const router = useRouter();
  const User = useContext(UserContext);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const email = User.userEmail;
    const password = User.userPswd;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    function isValidEmail(email: string) {
      return emailRegex.test(email);
    }
  
    if (!isValidEmail(email)) {
      if (email === 'Admin@Admin.com') {
        const finded = User?.FindUser({ email: email, collection: 'Admin' });
        // Test point: Admin user found
      }
      return; // Exit early if the email is invalid or it is the Admin user.
    }
  
    let code, id,user; // Declare the variables here to avoid redeclaration
  
    switch (User?.userFind) {
      case 'Wait':
        const finded: any = await User?.FindUser({ email, collection: 'Client' });
        break;
  
      case 'connect':
        const connect: any = await User?.Login({ email, password, collection: 'Client' });
        ({ code, id , user} = await connect); // Assign the values here, don't redeclare
        switch (code) {
          case 404:
            // Test point: Code 404 handling
            break;
  
          case 202:
            // Test point: Code 202 handling
            console.log(id);
            await User?.setUserData(user);
            console.log(await User?.userData)
            router.push(`/account/${id}`);
            break;
  
          default:
            // Handle other codes here, if needed.
            break;
        }
        break;
  
      case 'register':
        const news = User?.isNews;
        const date = new Date();
        const register: any = User?.CreateAccount({
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
          {User?.userFind === 'register'? <p>Bienvenue chez Brodiz, créez un compte pour continuer</p> : <p>Indiquez votre email pour l'inscription ou vous connecter</p>}
          <div className={styles.InputContainer}>
            <input
              onChange={(e: any) => {
                User?.setUserEmail(e.target.value);
              }}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              required
            />
            <span className={styles.spanFoc}>Email</span>
          </div>
          {User?.userFind === 'Wait' ? (
            <></>
          ) : (
            <>
              <div className={styles.InputContainer}>
                <input pattern="[a-zA-Z]+" required />
                <span className={styles.spanFoc}>Mdp</span>
              </div>
              {User?.userFind === 'register' ? (
                <>
                  <p>S'inscrire à la newsletter :</p>
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
