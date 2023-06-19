import Image from 'next/image'
import styles from './page.module.css'
import Slide from '@/components/slider/homeSlider/homeslider'
import HomePersonnalisation from '@/components/homePersonnalisation/homePersonnalisation'
import ProductCard from '@/components/ProductCard/productCardHome/productcard'
import Carousel from '@/components/carroussel/homecarroussel/homecarroussel'

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
     <HomePersonnalisation/>
     <ProductCard product={product}/>
     <Carousel products={products}/>
    </main>
  )
}
