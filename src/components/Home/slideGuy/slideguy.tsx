import styles from './slideguy.module.css'
import Image from 'next/image'
import { useEffect, useRef,useState } from 'react';
export default function Slideguy(){

    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=>{
     
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
  
    },[])

    return(
        <div className={styles.Container} ref={containerRef}>
            <div className={styles.containerTitle}>
<p>SELECTION</p>
 <h2>TROUVE TON STYLE</h2>

            </div>
<div className={styles.containerImg}>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
    <div className={styles.img}>
   {/* <Image src={'/'} alt={'Homme avec un sweat brodiz'} fill /> */}

    </div>
</div>
        </div>
    )
}