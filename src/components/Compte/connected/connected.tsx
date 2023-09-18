import { useContext,useEffect,useState } from 'react';
import { UserContext } from '@/app/Context/UserAccountContext';
import { useRouter } from 'next/navigation';
import Commandes from '../commandes/commandes';
import styles from './connected.module.css'

 function Connected(id:{id:string}){
    const [user,setUser] = useState<any>({}); 
    const [menu,setMenu] = useState(1);
    const router = useRouter();
    const User = useContext(UserContext);
   
    useEffect(() => {
        const fetchData = async () => {
            const userCon:any = async () => { 
                const userCon:any = await User.UserConnected(id);
                console.log(userCon);
                return userCon;
            }
          try {
            const userData = await userCon();
            console.log('dans le try du connected',userCon);
            if (userData.code === 200) {
                setUser(userData.user)

                console.log('on est dans le if du connected', userData)
            } else if(userData.code === 404){
                router.push('/account')
            }
          } catch (error) {
            // Handle errors if any
          }
        };
        fetchData();
      }, [id,User,router]);

     
    return (
        <div className={styles.container}>
        <h1>Hello {user.email}</h1>
<div className={styles.ButtonContainer}>
    <span className={`${menu === 1 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{setMenu(1)}}>Commandes</span>
    <span className={`${menu === 2 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{setMenu(2)}}>Profil</span>
    <span className={`${menu === 3 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{setMenu(3)}}>Ma liste de favorie</span>
</div>
{menu === 1? <Commandes user={user}/> : <></>}

    </div>
    )
}

export default Connected;