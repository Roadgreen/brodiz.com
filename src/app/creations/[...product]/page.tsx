"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/app/Context/productStore";
import { useGlobalContextCart } from "@/app/Context/cartContext";
import ProductCardDetails from "@/components/ProductCard/productPage/productCardDetails";
import PanierProductPage from "@/components/Panier/panierProductPage/panierProductPage";
import ProductCardComments from "@/components/ProductCard/productCardComments/productCardComments";

export default function ProductPage({
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
    <div>
      {selectedProduct.img ? 
  <ProductCardDetails product={selectedProduct} /> : <></>
      }
      {addedToCart ? <PanierProductPage/> : ''}
    <ProductCardComments comments={selectedProduct.comments}/>
    </div>
  );
}
