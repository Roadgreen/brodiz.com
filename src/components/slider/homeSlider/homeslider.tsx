import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Oswald } from 'next/font/google';
import Link from "next/link";
import styles from "../homeSlider/homeslider.module.css";
import image from  '../../../../public/img/producthero/houseofhero.svg'
import { useGlobalContextAnalytics } from "@/app/Context/analyticsContext";
import useWindowSize from "@/components/Function/usewindowsize";
import { useRef } from 'react';
import useParallax from '@/components/Function/parallax';

const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: '700'
});
const oswald2 = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: '300'
});

export default function Slide() {
  const { sendEvent } = useGlobalContextAnalytics();

  const handleClick = () => {
    sendEvent({
      url: '',
      eventName: 'click',
      sessionId: '',
      data: { clickName: 'Acheter maintenant', clickCategorie: 'Home' }
    });
  };

  return (
    <div className={`${styles.Container} ${oswald.className}`}>
      <div className={styles.ContainerTitle}>
        <h1>COOL<br />FUN<br />TRENDY<br /></h1>
        <button className={`${styles.Button} ${oswald2.className}`}>Voir les Produits</button>
      </div>
      <div className={styles.containerImg}>
        <Image className={styles.img} src={image} alt="photos de produit Brodiz.com" fill />
      </div>
    </div>
  );
}
