"use client";
import styles from "./page.module.css";
import ProdCardCrea from "@/components/ProductCard/productCardCreations/prodCardCrea";
import { useGlobalContextAnalytics } from "../Context/analyticsContext";
import { useContext,useState } from "react";

export default function Creations() {
  const {sendPageview,sendEvent} = useGlobalContextAnalytics();
    const [menu,setMenu] = useState(0);
    sendPageview( {url: '',
    referrer: '',
    userAgent: '',
    visitorId: '',
    userId: '',
    sessionId: '',
    timeOnPage: '',
    screenResolution: '',
    product: {},
    pageCategory: 'Home',
    data: {
    }});
    const handleAnalytics = async (menu:number)=>{
if(menu === 0){
  sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Sweatshirt_a_capuche',clickCategorie: 'Creations'}})
}else if(menu === 1){
  sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Pull',clickCategorie: 'Creations'}})
}else if(menu === 2){
  sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Accessoire_enfant',clickCategorie: 'Creations'}})
}else if(menu === 3){
  sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Accessoire_de_bain',clickCategorie: 'Creations'}})
}
    }
  return (
   
        <div className={styles.Container}>
            <div className={styles.buttonContainer}>
            <span onClick={()=>{setMenu(0),handleAnalytics(menu)}} className={menu === 0 ? styles.activeButton : styles.button}>Sweatshirt à capuche</span>
          <span onClick={()=>{setMenu(1),handleAnalytics(menu)}} className={menu === 1 ? styles.activeButton : styles.button}>Pull</span>
          <span onClick={()=>{setMenu(2),handleAnalytics(menu)}} className={menu === 2 ? styles.activeButton : styles.button}>Accessoire enfant</span>
          <span onClick={()=>{setMenu(3),handleAnalytics(menu)}} className={menu === 3 ? styles.activeButton : styles.button}>Accessoire de bain</span>
            </div>
         {menu === 0 ?  <ProdCardCrea id={menu}/> : <></>}
         {menu === 1 ?  <ProdCardCrea id={menu}/> : <></>}
         {menu === 2 ?  <ProdCardCrea id={menu}/> : <></>}
         {menu === 3 ?  <ProdCardCrea id={menu}/> : <></>}

        </div>
  );
}
