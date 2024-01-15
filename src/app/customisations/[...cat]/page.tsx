"use client";
import React from 'react'
import { useGlobalContextCart } from '@/app/Context/cartContext';
import { useGlobalContext } from '@/app/Context/productStore';
import CustomProduct from '@/components/customisationsPage/customisationsProduct/customProduct';
import { useState,useEffect } from 'react';
import PanierProductPage from '@/components/Panier/panierProductPage/panierProductPage';
import ProductCardComments from '@/components/ProductCard/productCardComments/productCardComments';

export default function Page({
    params,
  }: {
    params: { cat: Array<string> };
  }) {
    const [isLoading, setIsLoading] = useState(true);
    console.log(params);
    const { selectedProduct, setSelectedProduct, productArray, productSearch } =
      useGlobalContext();
      const {addedToCart} = useGlobalContextCart();
      useEffect(() => {
        console.log(selectedProduct, Object.keys(selectedProduct));
        async function searchProduct() {
          if (selectedProduct.id !== params.cat[1]) {
            const product = await productSearch(
              { id: params.cat[1] },
              "Customisation",
              "Product"
            );
            setSelectedProduct(product?.[0] ?? {});
          }
          setIsLoading(false);
        }
        searchProduct();
      }, [params.cat, selectedProduct, setSelectedProduct,productSearch]);
  
    if (isLoading) {
      return <div>Chargement en cours...</div>;
    }
  return (
    <div>
    {selectedProduct.img ? 
      <CustomProduct product={selectedProduct}/> : <></>
    }
    {addedToCart ? <PanierProductPage/> : ''}
  <ProductCardComments comments={selectedProduct.comments}/>
  </div>
  
  )
}
