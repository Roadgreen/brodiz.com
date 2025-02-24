import React, { useRef } from "react";
import styles from "./slidePromotion.module.css";
import Image from "next/image";
import Link from "next/link";
import useParallax from "@/components/Function/parallax";
import womenWhite from '@/productImg/Home/womensweat.jpg'
import MenWhite from '@/productImg/Home/Mensweatchisrt.jpg'
import { useRouter } from 'next/navigation'
import babyjedi from '../../../productImg/Home/babyjedi.jpg'
import serpent from '../../../productImg/Home/serpentard.jpg'
import quarta from '../../../productImg/Home/quarte.jpg'
import gryf from '../../../productImg/Home/gryf.jpg'
import littlecat from '../../../productImg/Home/littlecat.jpg'
import { color } from "html2canvas/dist/types/css/types/color";
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
 <Link style={{ textDecoration: "none" }} href={'/creations'}>
 <div className={styles.littleBentoHor}>
        <h3 >Collection Homme</h3>
        <Image className={styles.Img} src={MenWhite} fill alt="Homme barbue avec sweatshirt blanc"/>
      </div>
      </Link>
      <Link style={{ textDecoration: "none" }} href={'/creations'}>
      <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      </Link>
      <Link style={{ textDecoration: "none" }} href={'/creations/Baby/Body_Baby_FuturJedi_001s'}>
      <div className={styles.MiddleBentoHor}>
        <h3 style={{ color: "black" }}>Collection Bébé</h3>
        <Image className={styles.Img} src={babyjedi} fill alt="Body enfant Jedi Star Wars"/>
      </div>
      </Link>
 </div>

 <div ref={para2} className={styles.Bento2}>
 <Link style={{ textDecoration: "none" }} href={'/creations'}>
 <div className={styles.littleBentoHor}>
        <h3>Collection enfant</h3>
        <Image className={styles.Img} src={littlecat} fill alt="enfant avec sweat blanc et des petits chats"/>
      </div>
      </Link>
 <div className={styles.BigBentoVer}>
        <h3></h3>
        <Image className={styles.Img} src={MenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
 </div>
 <div ref={para3} className={styles.Bento3}>
 <div className={styles.littleBentoHor}>
       <h3></h3>
        <Image className={styles.Img} src={serpent} fill alt="Homme sweatshirt Harry potter"/>
      </div>
      <div className={styles.MiddleBentoHor}>
        <h3>Collection Homme</h3>
        <Image className={styles.Img} src={gryf} fill alt="deux femmes avec sweatshirt"/>
      </div>
    
      <div className={styles.littleBentoHor}>
        <h3>Collection Femme</h3>
        <Image className={styles.Img} src={womenWhite} fill alt="deux femmes avec sweatshirt"/>
      </div>
      <div className={styles.MiddleBentoHor}>
        <h3>Collection Homme</h3>
        <Image className={styles.Img} src={quarta} fill alt="femmes sweat blanc Quartararo"/>
      </div>

 </div>
     
    
     
    
    
     
    </div>
  );
}
