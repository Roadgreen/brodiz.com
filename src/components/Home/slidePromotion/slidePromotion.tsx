import React from 'react'
import styles from './slidePromotion.module.css'
import Image from 'next/image'

export default function SlidePromotion() {
  return (
    <div className={styles.container}>
       <h1 className={styles.h1_1}>
       EGAYEZ VOS FÊTES AVEC NOTRE COLLECTION DE NOËL
       </h1>
        <h1 className={styles.h1_2}>
            -20%
        </h1>
        <h2>
          Sur notre selection PERE NOEL*
        </h2>

    </div>
  )
}
