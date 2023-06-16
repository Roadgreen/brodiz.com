// Import necessary libraries
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../homeSlider/homeslider.module.css';
import image from '../../../../public/img/producthero image/Ryukwomen.jpg'
// Here is your Slide component
export default function Slide(){

  return (
    <div className={styles.slideContainer}>
      <Image src={image} alt={'/Women embroidery'} width={500} height={500} />
      <div>
      <h2>Réveillez votre garde-robe avec notre sweat brodé!</h2>
      <Link href={``} passHref>
        <button className={styles.button}>
          Acheter maintenant
        </button>
      </Link>
      
      </div>
     
    </div>
  );
};

