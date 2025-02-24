import React, { useRef } from "react";
import styles from "./slidePromotion.module.css";
import Image from "next/image";
import Link from "next/link";
import useParallax from "@/components/Function/parallax";
import womenWhite from '@/productImg/Home/womensweat.jpg'
import MenWhite from '@/productImg/Home/Mensweatchisrt.jpg'
import { useRouter } from 'next/navigation'
import babyjedi from '../../../productImg/Home/babyjedi.jpg'
export default function SlidePromotion() {
  const router = useRouter()
  const para = useRef<any>();
  const para2 = useRef<any>();
  const para3 = useRef<any>();
  useParallax(para,0.3)
  useParallax(para2,0.6)
  useParallax(para3,0.9)
  return (
    <div   className={styles.container}>
 <div ref={para} className={styles.Bento1}>
 <div className={styles.littleBentoHor}>
        <h3>Collection Homme</h3>
        <Image className={styles.Img} src={MenWhite} fill alt="Homme barbue avec sweatshirt blanc"/>
      </div>
      <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      <Link href={'/creations'}>
      <div className={styles.MiddleBentoHor}>
        <h3>Collection Bébé</h3>
        <Image className={styles.Img} src={babyjedi} fill alt="Body enfant Jedi Star Wars"/>
      </div>
      </Link>
 </div>
 <div ref={para2} className={styles.Bento2}>
 <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
 <div className={styles.BigBentoVer}>
        <h3>Sweatshirt Bearded Man</h3>
        <Image className={styles.Img} src={MenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
 </div>
 <div ref={para3} className={styles.Bento3}>
 <div className={styles.littleBentoHor}>
        <h3>Collection Homme</h3>
        <Image className={styles.Img} src={MenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      <div className={styles.MiddleBentoHor}>
        <h3>Collection Homme</h3>
        <Image className={styles.Img} src={MenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
    
      <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      <div className={styles.MiddleBentoHor}>
        <h3>Collection Homme</h3>
        <Image className={styles.Img} src={MenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>

 </div>
     
    
     
    
    
     
    </div>
  );
}
