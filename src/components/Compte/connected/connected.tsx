import { useContext,useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Commandes from '../commandes/commandes';
import Profil from '../profil/profil';
import styles from './connected.module.css'
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';

 function Connected(id:{id:string}){
    const [user,setUser] = useState<any>({}); 
    const [menu,setMenu] = useState(1);
    const router = useRouter();
const {UserConnected} = useGlobalContextUser();
    useEffect(() => {
        const fetchData = async () => {
            const userCon:any = async () => { 
              const newId = id.id;
                const userCon:any = await UserConnected(newId);
                console.log(userCon);
                return userCon;
            }
          try {
            const userData = await userCon();
            console.log('dans le try du connected',userCon);
            if (userData.code === 200) {
              console.log(userData);
              return await setUser(userData.user)

                console.log('on est dans le if du connected', userData)
            } else if(userData.code === 404){
              return  router.push('/account')
            }
          } catch (error) {
            // Handle errors if any
          }
        };
        fetchData();
      }, [id,UserConnected,router,setUser]);

     
    return (
        <div className={styles.container}>
        <h1>Hello {user.email}</h1>
<div className={styles.ButtonContainer}>
    <span className={`${menu === 1 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{setMenu(1)}}>Commandes</span>
    <span className={`${menu === 2 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{setMenu(2)}}>Profil</span>
    <span className={`${menu === 3 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{setMenu(3)}}>Ma liste de favorie</span>
</div>
{menu === 1? <Commandes user={user}/> : <></>}
{menu === 2? <Profil user={user}/> : <></>}


    </div>
    )
}

export default Connected;