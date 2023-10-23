import React from "react";
import styles from "./customisationPage.module.css";
import Image from "next/image";

export default function CustomisationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.firstCustom}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src={"/img/product/persoChien.jpg"}
            alt={"image de personnalisation de vêtement"}
            fill
          />
        </div>
        <div className={styles.textContainer}>
          <h3>Personnalisé votre Hoodies avec votre meilleur amis!</h3>
          <p>
            Offrez à votre amour pour les animaux de compagnie une touche unique
            avec nos sweatshirts personnalisés. Chaque sweatshirt est
            soigneusement brodé avec l'image de votre animal de compagnie
            préféré, créant ainsi une pièce de mode qui célèbre l'amour que vous
            partagez. Que vous ayez un chien, un chat, un lapin ou tout autre
            ami à quatre pattes, nos sweatshirts personnalisés sont la meilleure
            façon de les porter fièrement tout en restant au chaud et
            confortable. Montrez votre amour inconditionnel avec style grâce à
            nos sweatshirts personnalisés.
          </p>
          <button className={styles.button}>Acheter</button>
        </div>
      </div>
      <div className={styles.firstCustom}>
        <div className={styles.textContainer}>
          <h3>Personnalisé votre Hoodies avec votre meilleur amis!</h3>
          <p>
            Offrez à votre amour pour les animaux de compagnie une touche unique
            avec nos sweatshirts personnalisés. Chaque sweatshirt est
            soigneusement brodé avec l'image de votre animal de compagnie
            préféré, créant ainsi une pièce de mode qui célèbre l'amour que vous
            partagez. Que vous ayez un chien, un chat, un lapin ou tout autre
            ami à quatre pattes, nos sweatshirts personnalisés sont la meilleure
            façon de les porter fièrement tout en restant au chaud et
            confortable. Montrez votre amour inconditionnel avec style grâce à
            nos sweatshirts personnalisés.
          </p>
          <button className={styles.button}>Acheter</button>
        </div>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            src={"/img/product/persoChien.jpg"}
            alt={"image de personnalisation de vêtement"}
            fill
          />
        </div>
      </div>
    </div>
  );
}
