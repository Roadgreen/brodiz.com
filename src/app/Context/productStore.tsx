"use client";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ProductContext = {
  productSearch: (doc: object, collection: string, db: string) => Promise<[{}]>;
  productArray: Array<Array<Object>>;
  setProductArray: Dispatch<SetStateAction<Array<Array<Object>>>>;
  selectedProduct: {
    name: string,
    img: Array<string>,
    price:string,
    description: string,
    color: string,
    size: string
  };
  setSelectedProduct: Dispatch<SetStateAction<Object>>;
};

export const ProductContext = createContext<ProductContext>(
  {} as ProductContext
);

export const ProductContextProvider = ({ children }: any) => {
  const [productArray, setProductArray] = useState([[{}]]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const productSearch = async (
    doc: object,
    collection: string,
    db: string
  ): Promise<[{}]> => {
    try {
      console.log("try productsearch");
      var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doc, collection, db }),
      };

      const reponseFindProduct = await fetch(
        process.env.FETCHPRODUCTSEARCH ||
          "http://localhost:8080/product/productSearch",
        myInit
      );
      const data: any = await reponseFindProduct.json();
      if (data.code === 202) {
        return data.Product;
      } else if (data.code === 404) {
        console.log("err lors de la recherche de produit");
      }
      return [{}];
    } catch (err) {
      console.log(err);
      return [{}];
    }
  };
  return (
    <ProductContext.Provider
      value={{
        productSearch,
        productArray,
        setProductArray,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useGlobalContext = () => useContext(ProductContext);
