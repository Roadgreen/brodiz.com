import { useContext } from 'react';
import { UserContext } from '@/components/Function/UserAccountContext';
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

    // Test point: Check if email is valid
    if (isValidEmail(email)) {
      // Test point: Check userFind value
      if (User?.userFind === 'Wait') {
        const finded: any = await User?.FindUser({ email, collection: 'Client' });
        const { code, status } = finded;

        if (code === 404) {
          // Test point: User not found, open password panel
        } else if (code === 202) {
          // Test point: Code 202 handling
        } else if (code === 1) {
          // Test point: Code 1 handling
        }
      } else if (User?.userFind === 'connect') {
        const connect: any = User?.Login({ email, password, collection: 'Client' });
        if (connect.code === 404) {
          // Test point: Code 404 handling
        } else if (connect.code === 202) {
          // Test point: Code 202 handling
        }
      } else if (User?.userFind === 'register') {
        const news = User?.isNews;
        const date = new Date();
        const register: any = User?.CreateAccount({
          email,
          password,
          collection: 'Client',
          newsletter: news,
          date: date.toString(),
        });
        const { code, status, id } = await register;
        if (code === 202) {
          // Test point: Successfully registered, navigate to account page
          router.push(`/account/${id}`);
        } else if (code === 404) {
          // Test point: Failed to add user, code 404 handling
        }
      }
    } else if (email === 'Admin@Admin.com') {
      const finded = User?.FindUser({ email: email, collection: 'Admin' });
      // Test point: Admin user found
    }
  };

  return (
    <div className={styles.Container}>
      <h1>Mon compte</h1>
      <div className={styles.formContainer}>
        <form>
          <p>Indiquez votre email pour l'inscription ou vous connecter</p>
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
                    <label>Oui</label>
                    <input
                      name="news"
                      value={1}
                      onChange={(e: any) => {
                        User?.setIsNews(e.target.value);
                      }}
                      checked
                      type="radio"
                    />
                    <label>Non</label>
                    <input
                      value={2}
                      onChange={(e: any) => {
                        User?.setIsNews(e.target.value);
                      }}
                      name="news"
                      type="radio"
                    />
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
