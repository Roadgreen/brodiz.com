import { useEffect, useState, useRef } from 'react';
import { useScroll } from "@/components/Function/useScroll";
import styles from "./slideScroll.module.css";

export default function SlideScroll() {
  const scrollY = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [rotateY, setRotateY] = useState(45);

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
      const colorValue = 255 - Math.floor(scrollFraction * 255);
      setBackgroundColor(`rgb(${colorValue}, ${colorValue}, ${colorValue})`);
      const rotationMaxScroll = 45; // La distance de défilement sur laquelle la rotation doit se produire
      const rotationScrollFraction = Math.min((scrollY - containerTop) / rotationMaxScroll, 1);
      const rotationValue = 45 - Math.floor(rotationScrollFraction * 45);
      setRotateY(rotationValue);
    }
  }, [scrollY, isVisible]);

  return (
    <div className={styles.Container} ref={containerRef} style={{ backgroundColor }}>
      <div style={{color:'white',fontSize:'2em',transform:`rotateY(${rotateY}deg)`}}><h2>TSHIRT PRINT</h2><h3>ICI incroyable</h3></div>
    </div>
  );
}
