"use client"
import ProductCard from '@/components/ProductCard/productCardHome/productcard';
import styles from './homecarroussel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from "swiper";
import useWindowSize from '@/components/Function/usewindowsize';


interface CarouselProps {
  products: {
    image: string;
    name: string;
    price: number;
  }[];
}

interface Product {
  image: string;
  name: string;
  price: number;
}



const Carousssel = ({ products }: CarouselProps) => {

  const size = useWindowSize();

 
  return (
 <div className={styles.container}>
{
  size.width > 1000 ? <Swiper
        slidesPerView={4}
        spaceBetween={10}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map((product,i) => 
           <SwiperSlide key={i} className={styles.swiperSlide}><ProductCard product={product}/></SwiperSlide>)}
       
       
      </Swiper> : <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {products.map(product => 
           <SwiperSlide className={styles.swiperSlide}><ProductCard product={product}/></SwiperSlide>)}
       
       
      </Swiper>
  
}

 </div>
  );
};

export default Carousssel;
