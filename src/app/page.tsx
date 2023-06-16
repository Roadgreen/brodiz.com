import Image from 'next/image'
import styles from './page.module.css'
import Slide from '@/components/slider/homeSlider/homeslider'
import HomePersonnalisation from '@/components/homePersonnalisation/homePersonnalisation'
export default function Home() {
  return (
    <main className={styles.main}>
     <Slide/>
     <HomePersonnalisation/>
    </main>
  )
}
