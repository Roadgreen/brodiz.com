import Image from 'next/image'
import styles from './page.module.css'
import Slide from '@/components/slider/homeSlider/homeslider'
import HomePersonnalisation from '@/components/homePersonnalisation/homePersonnalisation'
import ProductCard from '@/components/ProductCard/productCardHome/productcard'
import Caroussel from '@/components/carroussel/homecarroussel/homecarroussel'
import SlidePromotion from '@/components/Home/slidePromotion/slidePromotion'

const product = {
  image: '/img/producthero image/Ryukwomen.jpg',
  name: 'Ryuk Sweatshirt Death Note',
  price: 60,
}
const products = [product,product,product,product]

export default function Home() {
  return (
    <main className={styles.main}>
     <Slide/>
<SlidePromotion/>
     <HomePersonnalisation/>
     <Caroussel products={products}/>
    </main>
  )
}
