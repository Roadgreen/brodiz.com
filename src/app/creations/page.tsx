"use client";
import styles from "./page.module.css";
import ProdCardCrea from "@/components/ProductCard/productCardCreations/prodCardCrea";
import { useContext,useState } from "react";

export default function Livraison() {
    const [menu,setMenu] = useState(0);

  return (
   
        <div className={styles.Container}>
            <div className={styles.buttonContainer}>
            <span onClick={()=>{setMenu(0)}} className={menu === 0 ? styles.activeButton : styles.button}>Sweatshirt à capuche</span>
          <span onClick={()=>{setMenu(1)}} className={menu === 1 ? styles.activeButton : styles.button}>Pull</span>
          <span onClick={()=>{setMenu(2)}} className={menu === 2 ? styles.activeButton : styles.button}>Accessoire enfant</span>
          <span onClick={()=>{setMenu(3)}} className={menu === 3 ? styles.activeButton : styles.button}>Accessoire de bain</span>
            </div>
         {menu === 0 ?  <ProdCardCrea id={menu}/> : <></>}
         {menu === 1 ?  <ProdCardCrea id={menu}/> : <></>}
         {menu === 2 ?  <ProdCardCrea id={menu}/> : <></>}
         {menu === 3 ?  <ProdCardCrea id={menu}/> : <></>}

        </div>
  );
}
