'use client'
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel}  from 'react-responsive-carousel';
import ProductCard from '@/components/ProductCard/productCardHome/productcard';
import styles from './homecarroussel.module.css';

import { ReactElement } from 'react';

interface ProductCarouselProps {
  products: {
    image: string,
    name: string,
    price: number
  }[];
}

const Carousssel = ({ products }: ProductCarouselProps) => {
    return (
        <Carousel
        showArrows={true}
        showIndicators={true}
        infiniteLoop={true}
        dynamicHeight={false}
        className={styles.mySwiper}
      >
            {products.map((product, index) => (
                <div key={index}>
                    <ProductCard product={product} />
                </div>
            ))}
        </Carousel>
    );
}
  
  export default Carousel;
  