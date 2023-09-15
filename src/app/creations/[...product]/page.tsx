"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGlobalContext } from "@/app/Context/productStore";
import ProductCardDetails from "@/components/ProductCard/productPage/productCardDetails";

export default function ProductPage({
  params,
}: {
  params: { product: Array<string> };
}) {
  const [isLoading, setIsLoading] = useState(true);
  console.log(params);
  const { selectedProduct, setSelectedProduct, productArray, productSearch } =
    useGlobalContext();
    useEffect(() => {
      console.log(selectedProduct, Object.keys(selectedProduct));
      async function searchProduct() {
        if (Object.keys(selectedProduct).length === 0) {
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
    }, [params.product, selectedProduct, setSelectedProduct]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }
  return (
    <div>
      {selectedProduct.img ? 
  <ProductCardDetails product={selectedProduct} /> : <></>
      }
    
    </div>
  );
}
