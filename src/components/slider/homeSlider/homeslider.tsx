// Import necessary libraries
import React, { useEffect,useState } from "react";
import Image from "next/image";
import { Oswald } from 'next/font/google'
import Link from "next/link";
import styles from "../homeSlider/homeslider.module.css";
import image from '@/productImg/Home/HeroImg.jpg';
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
import useWindowSize from "@/components/Function/usewindowsize";
import { useRef } from 'react';
import useParallax from '@/components/Function/parallax';

const oswald = Oswald({
  subsets: ['latin'],
  display:'swap',
  weight:"700"
})
const oswald2 = Oswald({
  subsets: ['latin'],
  display:'swap',
  weight:"400"
})
// Here is your Slide component
export default function Slide() {

  const {sendEvent} = useGlobalContextAnalytics();
  const windowSize = useWindowSize();
  const [height, setHeight] = useState(windowSize.height);

  useEffect(()=>{
    setHeight(windowSize.height)
  },[windowSize])

  const handleClick = () => {
sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Acheter maintenant',clickCategorie: 'Home'}})
  }

  return (
    <div className={styles.slideContainer} style={{ height: `${height}px` }}>
         <div  className={`${styles.containerText}`}>
       <h1 className={oswald.className}>ICI C'EST<br/> BRODERIE</h1>
       <div className={styles.French}><div style={{backgroundColor:'#012697'}}></div><div style={{backgroundColor:'#f9f9f9'}}></div><div style={{backgroundColor:'#fd1e32'}}></div></div>
       <p className={oswald2.className}>Explorez l'élégance brodée au cœur de la France.</p>
       <div className={`${styles.button} ${oswald2.className}`}>Découvrir</div>
      </div>
       <div style={{ height: `${height}px` }} className={styles.containerImg} >
   
     
        <Image className={styles.img}  src={image} fill alt={'homme avec sweat brodé'}/>
      </div>
  
     
        
    </div>
  );
}
