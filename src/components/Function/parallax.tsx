// ParallaxFunction.js
import { useEffect } from 'react';

const useParallax = (ref:any, speed:number) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollTop = window.scrollY;
        const offset = ref.current.offsetTop;
        const distance = offset - scrollTop;

        // Appliquer la transformation en fonction du défilement et de la vitesse
        ref.current.style.transform = `translateY(${distance * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);
};

export default useParallax;
