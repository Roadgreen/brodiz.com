"use client";
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import styles from './page.module.css'
import { useContext } from 'react'
import {useGlobalContext } from '@/app/Context/productStore'
import ProductCardDetails from '@/components/ProductCard/productPage/productCardDetails';

export default function ProductPage({id}:{id: Params}){
const {selectedProduct,setSelectedProduct,productArray} = useGlobalContext();
    return (
     <div>
        <ProductCardDetails product={selectedProduct}/>
     </div>
    )
}