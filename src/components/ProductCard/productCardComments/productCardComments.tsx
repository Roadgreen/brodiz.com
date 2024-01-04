import { useGlobalContextUser } from "@/app/Context/UserAccountContext"
import { useEffect, useState } from "react";
import styles from "./productCardComments.module.css"

interface comments {
username: string,
date: Date,
comments:string
}

interface ProductCardCommentsProps {
    comments: comments[];
  }
  

export default function ProductCardComments(comments:ProductCardCommentsProps) {
const {UserConnected} = useGlobalContextUser();
const [userConnected,setUserConnected] = useState(false);

useEffect(()=>{
    const id = localStorage.getItem('userId');
  
  if(id !== undefined && id !== null){
    const connected = UserConnected(id);
    connected.then((res:any)=>{
      console.log(res.code)
      if(res.code === 200){
        setUserConnected(true);
      }else{
        setUserConnected(false);
      }
    }
      
    )
  }
  })



  return (
    <div className={styles.container}>
      
        {userConnected ? ( <div className={styles.ContainersCommentsAdd}><p>Ajoutez un commentaire:</p>
        <label >Votre prénom:</label>
        <input id="prenom" name="prenom" placeholder="Votre prenom"></input>
        <label>Votre commentaire:</label>
        <textarea></textarea>
        <button>Envoyer</button>
        </div>) : '' }
       <div>
       {comments && comments.comments && comments.comments.map((item, i) => (
          <div className={styles.ContainerComments} key={i}>
            <div>
              <p>{item.username}</p>
              <p>{new Date(item.date).toLocaleDateString()}</p>
            </div>
            <p>{item.comments}</p>
          </div>
        ))}
       </div>
    </div>
  )
}
