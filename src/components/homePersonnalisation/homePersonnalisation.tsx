// Import necessary libraries
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./homePersonnalisation.module.css";
import image from "../../../public/img/producthero image/womendog.jpg";
// Here is your Slide component
export default function HomePersonnalisation() {
  return (
    <div className={styles.slideContainer}>
      <div>
        <h2>vêtements brodés personnalisés</h2>
        <p className={styles.p}>
          Immortalisez votre compagnon à quatre pattes avec nos vêtements brodés
          personnalisés. Transmettez-nous une photo de votre animal et nos
          experts en broderie donneront vie à leur image sur votre vêtement
          préféré !
        </p>
        <Link href={``} passHref>
          <button className={styles.button}>Personnalisé</button>
        </Link>
      </div>
      <Image src={image} alt={"/Women embroidery"} width={500} height={500} />
    </div>
  );
}
