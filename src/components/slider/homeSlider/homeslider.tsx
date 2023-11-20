// Import necessary libraries
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../homeSlider/homeslider.module.css";
import image from "../../../../public/img/producthero image/Ryukwomen.jpg";
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
// Here is your Slide component
export default function Slide() {
  const {sendEvent} = useGlobalContextAnalytics();
  const handleClick = () => {
sendEvent({ url: '',
  eventName: 'click',
  sessionId:'',
  data:{clickName : 'Acheter maintenant',clickCategorie: 'Home'}})
  }
  return (
    <div className={styles.slideContainer}>
      <Image src={image} alt={"/Women embroidery"} width={500} height={500} />
      <div>
        <h2>Réveillez votre garde-robe avec notre sweat brodé!</h2>
        <p>
          Nous croyons fermement que chaque vêtement brodé est une œuvre d&apos;art,
          et nous sommes fiers de faire revivre cette forme d&apos;art traditionnelle
          d&apos;une manière moderne et trendy.
        </p>
        <Link href={``} passHref>
          <button onClick={()=>{handleClick()}} className={styles.button}>Acheter maintenant</button>
        </Link>
      </div>
    </div>
  );
}
