import { useEffect, useState, useRef } from 'react';
import { useScroll } from "@/components/Function/useScroll";
import styles from "./slideScroll.module.css";
import Image from 'next/image';
import img from '../../../productImg/Hoodies/Ryukwomen.jpg'
import meteorite from '../../../../public/img/producthero/meteorite1.svg'
import meteorite2 from '../../../../public/img/producthero/meteorite2.svg'
import meteorite3 from '../../../../public/img/producthero/meteorite3.svg'
import meteorite4 from '../../../../public/img/producthero/metorite4.svg'
import { CssVariable } from 'next/dist/compiled/@next/font';

export default function SlideScroll() {
  const scrollY = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [rotateY, setRotateY] = useState(45);
  const [opacity,setOpacity] = useState(0);
  const [scrollYUse,setScrollYUse] = useState(0)

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    const options = {
      root: null,
      rootMargin: "0px", // Déclenche lorsque le bas du conteneur entre dans le viewport
      threshold: 0
    };
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && containerRef.current) {
        const containerTop = containerRef.current.offsetTop;
      const maxScroll = 400; // La distance maximale de défilement pour que la transition soit complète
      const scrollFraction = Math.min((scrollY - containerRef.current.offsetTop + window.innerHeight) / maxScroll, 1);
      console.log(scrollFraction);
      const colorValue = 255 - Math.floor(scrollFraction * 255);
      setBackgroundColor(`rgb(${colorValue}, ${colorValue}, ${colorValue})`);
      const rotationMaxScroll = 1500; // La distance de défilement sur laquelle la rotation doit se produire
      const rotationScrollFraction = Math.min((scrollY - containerTop) / rotationMaxScroll, 1);
      const rotationValue = 50 - Math.floor(rotationScrollFraction * 50);
      setRotateY(rotationValue);
      setScrollYUse(scrollY);
      setOpacity(scrollFraction);
   


    }
  }, [scrollY, isVisible]);

  return (
    <div className={styles.ContainerFirst} >
      <div className={styles.Container} ref={containerRef} style={{ backgroundColor }}>
      <div className={styles.TitleDiv} style={{opacity:`${opacity}`,filter: `blur(${rotateY})`,color:'white'}}><h2 className={styles.Title}>TSHIRT PRINT</h2></div>
      <div className={styles.ProductContainer}>
        <div className={styles.SliderContainer}>
          <div className={styles.list}>
            <div style={{ ["--position" as CssVariable]: 1 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 2 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 3 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 4 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 5 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 6 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 7 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 8 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 9 }} className={styles.item}></div>
          <div style={{ ["--position" as CssVariable]: 10 }} className={styles.item}></div>
          </div>

        </div>
      <div className={styles.AnimContainer}>
      <div className={styles.imgContainer}><Image className={styles.img} src={meteorite} alt={'image de produit'} fill /></div>
      <div className={styles.imgContainer2}><Image className={styles.img} src={meteorite2} alt={'image de produit'} fill /></div>
      <div className={styles.imgContainer3}><Image className={styles.img} src={meteorite3} alt={'image de produit'} fill /></div>
      <div className={styles.imgContainer4}><Image className={styles.img} src={meteorite4} alt={'image de produit'} fill /></div>
      <div className={styles.imgContainer5}><Image className={styles.img} src={meteorite2} alt={'image de produit'} fill /></div>
      <div className={styles.imgContainer6}><Image className={styles.img} src={meteorite} alt={'image de produit'} fill /></div>
      </div>
      </div>
      </div>
  
     
    </div>
  );
}
