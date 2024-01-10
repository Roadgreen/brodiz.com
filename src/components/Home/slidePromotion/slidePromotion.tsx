import React, { useRef } from "react";
import styles from "./slidePromotion.module.css";
import Image from "next/image";
import Img1 from "@/productImg/Hoodies/hommeJPPMT.jpg";
import useParallax from "@/components/Function/parallax";

export default function SlidePromotion() {
  const para = useRef<HTMLAllCollection>();
  useParallax(para,0.1)
  return (
    <div  className={styles.container}>
      <div ref={para} className={styles.containerImg}>
        <Image
          className={styles.img}
          src={Img1}
          alt={"Homme sweatshirt je peux pas jai motogp"}
          fill
        />
      </div>
      <div className={styles.containerText}>
        <h1>Streatwear Homme</h1>
        <h2>La broderie à votre service</h2>
        <p>
          Plongez dans notre univers de sweatshirts brodés, où l'expression de
          soi rencontre l&apos;artisanat de qualité. Parcourez notre sélection
          complète de sweatshirts streetwear, conçus pour homme, femme et
          enfant, et découvrez la fusion parfaite entre confort et style.
          Laissez la broderie parler pour vous, choisissez parmi nos créations
          uniques et affirmez votre personnalité avec élégance.
        </p>
        <button>Découvrir</button>
      </div>
    </div>
  );
}
