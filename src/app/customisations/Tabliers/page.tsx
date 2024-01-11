import React from 'react'
import { useGlobalContextCart } from '@/app/Context/cartContext';
import { useGlobalContext } from '@/app/Context/productStore';
import CustomTablier from '@/components/customisationsPage/customisationsProduct/customTablier/customTablier'
import { useState,useEffect } from 'react';

export default function Page({
    params,
  }: {
    params: { product: Array<string> };
  }) {
    const [isLoading, setIsLoading] = useState(true);
    console.log(params);
    const { selectedProduct, setSelectedProduct, productArray, productSearch } =
      useGlobalContext();
      const {addedToCart} = useGlobalContextCart();
      useEffect(() => {
        console.log(selectedProduct, Object.keys(selectedProduct));
        async function searchProduct() {
          if (selectedProduct.id.length === 0) {
            const product = await productSearch(
              { id: params.product[1] },
              params.product[0],
              "Product"
            );
            setSelectedProduct(product?.[0] ?? {});
          }
          setIsLoading(false);
        }
        searchProduct();
      }, [params.product, selectedProduct, setSelectedProduct,productSearch]);
  
    if (isLoading) {
      return <div>Chargement en cours...</div>;
    }
  return (
    <>
    <CustomTablier product={selectedProduct}/>
    </>
  )
}
