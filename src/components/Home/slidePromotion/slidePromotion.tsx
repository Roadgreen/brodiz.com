import React from 'react'
import styles from './slidePromotion.module.css'
import Image from 'next/image'
import womendog from '../../../../public/img/producthero image/womendog.jpg'
import Menserpentard from '../../../../public/img/producthero image/Menserpentard.jpg'
import bab from '../../../../public/img/producthero image/baby.png'

export default function SlidePromotion() {
  return (
    <div className={styles.container}>
     <div><Image className={styles.img} src={womendog} fill alt=''/></div>
     <div><Image className={styles.img} src={Menserpentard} fill alt=''/></div>
     <div><Image className={styles.img} src={bab} fill alt=''/></div>
    </div>
  )
}
