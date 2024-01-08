// Import necessary libraries
import React, { useEffect,useState } from "react";
import Image from "next/image";
import { Anybody } from 'next/font/google'
import Link from "next/link";
import styles from "../homeSlider/homeslider.module.css";
import image from '@/productImg/Hoodies/homme-home.jpg';
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
import useWindowSize from "@/components/Function/usewindowsize";

const anybody = Anybody({
  subsets: ['latin'],
  display:'swap',
  weight:"200"
})
// Here is your Slide component
export default function Slide() {
  const {sendEvent} = useGlobalContextAnalytics();
  const windowSize = useWindowSize();
  const [height, setHeight] = useState(500);
  const handleClick = () => {
sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Acheter maintenant',clickCategorie: 'Home'}})
  }
  useEffect(() => {
    windowSize.height
    setHeight(windowSize.height - 150);
  }, [windowSize.height]);
  return (
    <div className={styles.slideContainer} style={{ height: `${height}px` }}>
      
      <div className={`${styles.containerText} ${anybody.className}`}>
        <h1>UN JOUR</h1>
        <h1>UN STYLE</h1>
        <p>Décrouvrez nos Broderie <br></br>de qualités</p>
        <button className={styles.button}>Découvrir</button>
      </div>
      <div className={styles.containerImg}>
        <Image className={styles.img} src={image} height={height}  alt={'homme avec sweat brodé'}/>
      </div>
  
     
        
    </div>
  );
}
