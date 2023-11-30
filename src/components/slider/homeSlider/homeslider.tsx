// Import necessary libraries
import React, { useEffect,useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../homeSlider/homeslider.module.css";
import image from "../../../../public/img/producthero image/deuxfilles.png";
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
import useWindowSize from "@/components/Function/usewindowsize";
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
      
        <div className={styles.containerImg}>
        <Image className={styles.img} src={image} alt={"/Women embroidery"} fill />
        </div>
  <div className={styles.containerAll}>
  <h2>IMMORTALISEZ LE MOMENT</h2>
   
       
   <Link href={``} passHref>
     <button onClick={()=>{handleClick()}} className={styles.button}>Découvrir La Collection</button>
   </Link>
  </div>
  
     
        
    </div>
  );
}
