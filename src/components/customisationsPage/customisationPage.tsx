"use client"
import React from "react";
import styles from "./customisationPage.module.css";
import Image from "next/image";
import femmeTablier from '@/productImg/Tablier/tablierfemme.jpg'
import womendog from '../../../public/img/producthero/womendog.jpg'
import { useRouter } from 'next/navigation'

export default function CustomisationPage() {
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.firstCustom}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src={womendog}
            alt={"image de personnalisation de vêtement"}
            fill
          />
        </div>
        <div className={styles.textContainer}>
          <h3>Personnalisé votre Hoodies avec votre meilleur amis!</h3>
          <p>
            Offrez à votre amour pour les animaux de compagnie une touche unique
            avec nos sweatshirts personnalisés. Chaque sweatshirt est
            soigneusement brodé avec l&apos;image de votre animal de compagnie
            préféré, créant ainsi une pièce de mode qui célèbre l&apos;amour que vous
            partagez. Que vous ayez un chien, un chat, un lapin ou tout autre
            ami à quatre pattes, nos sweatshirts personnalisés sont la meilleure
            façon de les porter fièrement tout en restant au chaud et
            confortable. Montrez votre amour inconditionnel avec style grâce à
            nos sweatshirts personnalisés.
          </p>
          <button className={styles.button}>Créer</button>
        </div>
      </div>
      <div className={styles.firstCustom}>
        <div className={styles.textContainer}>
          <h3>Personnalisé vos Tabliers avec de la Broderie</h3>
          <p>
          Découvrez {`l'élégance`} de la personnalisation avec notre gamme exclusive de tabliers brodés, conçus spécialement pour répondre aux besoins de votre commerce ou de votre maison. Chez Brodiz.com, nous croyons que chaque détail compte, c&apos;est pourquoi nos tabliers personnalisés allient style, durabilité et un caractère unique.
          </p>
          <button onClick={() => router.push('/customisations/Tablier/cust_Tablier_001')} className={styles.button}>Créer</button>
        </div>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src={femmeTablier}
            alt={"image de personnalisation de vêtement"}
            fill
          />
        </div>
      </div>
    </div>
  );
}
