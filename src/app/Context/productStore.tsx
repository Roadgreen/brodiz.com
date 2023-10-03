"use client";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
interface product {
  id: string,
  name: string,
  img: Array<string>,
  price:string,
  description: string,
  color: Array<Object>,
  size:Array<string>,
  category: Array<string>,
  tag: string,
  quantity: number,
  
}
type ProductContext = {
  productSearch: (doc: object, collection: string, db: string) => Promise<product[]>;
  productArray: Array<Array<product>>;
  setProductArray: Dispatch<SetStateAction<product[][]>>;
  selectedProduct: product;
  setSelectedProduct: Dispatch<SetStateAction<product>>;
};

export const ProductContext = createContext<ProductContext>(
  {} as ProductContext
);

export const ProductContextProvider = ({ children }: any) => {
  const [productArray, setProductArray] = useState<product[][]>([[{  id: "",
  name: "",
  img: [],
  price: "",
  description: "",
  color: [],
  size: [],
  category: [],
  tag: "",
  quantity: 0,
}]]);

  const [selectedProduct, setSelectedProduct] = useState<product>({  id: "",
  name: "",
  img: [],
  price: "",
  description: "",
  color: [],
  size: [],
  category: [],
  tag: "",
  quantity: 0,
});

  const productSearch = async (
    doc: object,
    collection: string,
    db: string
  ): Promise<product[]> => {
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
      return [];
    } catch (err) {
      console.log(err);
      return [];
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
