import { useContext,useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Commandes from '../commandes/commandes';
import Profil from '../profil/profil';
import styles from './connected.module.css'
import { useGlobalContextUser } from '@/app/Context/UserAccountContext';
import { useGlobalContextAnalytics } from '@/app/Context/analyticsContext';

 function Connected(id:{id:string}){
  const {sendPageview,sendEvent} = useGlobalContextAnalytics();
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
       console.log(user);
      if(user.adress){
        sendPageview( {url: '',
        referrer: '',
        userAgent: '',
        visitorId: '',
        userId: '',
        sessionId: '',
        timeOnPage: new Date,
        screenResolution: '',
        product: [''],
        pageCategory: 'Espace_client',
        data: {
user_pays: user.adress[0].pays || '',
user_ville: user.adress[0].ville || '',
user_commandes: user.commandes.length || '',
user_newsletter: user.newsletter || '',
}});
      } else {
        sendPageview( {url: '',
        referrer: '',
        userAgent: '',
        visitorId: '',
        userId: '',
        sessionId: '',
        timeOnPage: new Date,
        screenResolution: '',
        product: [''],
        pageCategory: 'Espace_client',
      data:{}})
      }
              
      
      }, [id,UserConnected,router,setUser,sendPageview]);

      const handleDisconnect = ()=>{
        localStorage.removeItem('token');
        router.push('/account')
      }

      const handleChoose = (i:number) => {
        let clickName = '';
        switch(i){
          case 1: clickName = 'commandes';
          break;
          case 2: clickName = 'mon_profil';
          break;
          case 3: clickName = 'ma_liste_de_favorie'
        }
        setMenu(i);

        sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : clickName,clickCategorie: 'account_section'}})
      }
     
    return (
        <div className={styles.container}>
        <h1>Hello {user.email}</h1>
    <div className={styles.ButtonDisc} onClick={()=>{handleDisconnect()}}>Déconnection</div>
<div className={styles.ButtonContainer}>
  
    <span className={`${menu === 1 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{handleChoose(1)}}>Profil</span>
    <span className={`${menu === 2 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{handleChoose(2)}}>Commandes</span>
    <span className={`${menu === 3 ? styles.activeSpan : styles.nonActiveSpan}`} onClick={()=>{handleChoose(3)}}>Ma liste de favorie</span>
</div>

{menu === 1? <Profil user={user}/> : <></>}
{menu === 2? <Commandes user={user}/> : <></>}


    </div>
    )
}

export default Connected;