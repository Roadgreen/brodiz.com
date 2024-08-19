"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import Slide from '@/components/slider/homeSlider/homeslider'
import HomePersonnalisation from '@/components/homePersonnalisation/homePersonnalisation'
import ProductCard from '@/components/ProductCard/productCardHome/productcard'
import SlidePromotion from '@/components/Home/slidePromotion/slidePromotion'
import { useGlobalContextAnalytics } from './Context/analyticsContext'
import SlideScroll from '@/components/Home/slide_scroll/slideScroll'
import Slideguy from '@/components/Home/slideGuy/slideguy'
const product = {
  image: '/img/producthero image/Ryukwomen.jpg',
  name: 'Ryuk Sweatshirt Death Note',
  price: 60,
}
const products = [product,product,product,product]

export default function Home() {
  const [innerWidth,setInnerWidth] = useState<number>(0);
  const {sendPageview} = useGlobalContextAnalytics();
  useEffect(()=>{
    console.log(window.innerWidth)
    setInnerWidth(window.innerWidth)
        sendPageview( {url: '',
        referrer: '',
        userAgent: '',
        visitorId: '',
        userId: '',
        sessionId: '',
        timeOnPage: new Date,
        screenResolution: '',
        product: {},
        pageCategory: 'Home',
        data: {
        }});
      
  },[sendPageview])
 

  return (
    <main className={styles.main}>
     <Slide/>
<SlidePromotion/>
<SlideScroll/>
<Slideguy/>
     <HomePersonnalisation width={innerWidth}/>
   
    </main>
  )
}
