"use client"
import React, { use, useState,useEffect } from 'react'
import styles from './menuSticky.module.css'
import { useScroll } from '@/components/Function/useScroll'
import useWindowSize from '@/components/Function/usewindowsize'
import accountStickyMenu from '@/iconImg/accountStickyMenu.png'
import homeStickyMenu from '@/iconImg/homeStickyMenu.png'
import creaStickyMenu from '@/iconImg/creaStickyMenu.png'
import custoStickyMenu from '@/iconImg/custoStickyMenu.png'
import panierStickyMenu from '@/iconImg/panierStickyMenu.png'
import { useRouter } from 'next/navigation'
import { useGlobalContextCart } from '@/app/Context/cartContext'
 import Image from 'next/image'
import Link from 'next/link'

export default function Menusticky() {
    const [stick,setStick] = useState<boolean>(false);
    const [mobile,setMobile] = useState<boolean>(false);
    const {cartItem} = useGlobalContextCart();
    const scrollHeight = useScroll();
    const windowSize = useWindowSize();
    const router = useRouter()
    useEffect(() => {
        //console.log('scrollheight',scrollHeight, stick)
        if (scrollHeight > 400 && windowSize.width > 768) {
          setStick(true);
          // Faire quelque chose ici lorsque scrollHeight atteint 200
        } else {
          setStick(false);
          // Faire quelque chose d'autre ici lorsque scrollHeight est inférieur à 200
        }
        if (scrollHeight > 190 && windowSize.width < 768 && window.document.location.pathname === "/") {
          setStick(true);
          setMobile(true)
          // Faire quelque chose ici lorsque scrollHeight atteint 200
        } else if(window.document.location.pathname !== "/" && windowSize.width < 768){
          setStick(true);
          setMobile(true)
        }
      }, [scrollHeight]);
  return (
    <div
      className={stick ? styles.Container : styles.ContainerNonex}
      style={mobile ? { top: windowSize.height -100 } :  { top: windowSize.height / 4 }}
    >
        
      <div onClick={() => router.push('/')}>
        <Image src={homeStickyMenu} fill alt="icône pour rejoindre laccueil" />
      </div>
      <div onClick={() => router.push('/creations')}>
        <Image src={creaStickyMenu} fill alt="icône pour les création" />
      </div>
      <div onClick={() => router.push('/customisations')}>
        <Image src={custoStickyMenu} fill alt="icône pour les custom" />
      </div>
      <div onClick={() => router.push('/account')}>
        <Image src={accountStickyMenu} fill alt="icône pour le compte" />
      </div>
      <div onClick={() => router.push('/panier')}>
        <Image src={panierStickyMenu} fill alt="Icone pour le panier" />
      </div>
     {
      cartItem.length > 0 ? <span className={styles.length}>{cartItem.length}</span> : ''
     }  
    </div>
  );
}
