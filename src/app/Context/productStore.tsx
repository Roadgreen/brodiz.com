"use client";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
interface ColorObject {
  color: string;
  name: string;
}

interface comments {
  username: string,
  date: Date,
  comments:string
  }
  
interface product {
  id: string,
  name: string,
  img: Array<[string,string]>,
  price:number,
  notes:number,
  price_ID: string,
  description: string,
  color: Array<ColorObject>,
  comments: Array<comments>,
  size:Array<string>,
  category: Array<string>,
  tag: Array<string>,
  quantity:number,
  custom:Object
}
interface productToAdd {
  id: string,
  name: string,
  img: Array<[string,string]>,
  price:number,
  notes:number,
  description: string,
  color: Array<Object>,
  size:Array<string>,
  category: Array<string>,
  tag: Array<string>,
  collection:string,
  comments:Array<comments>
  custom:Object
}
type ProductContext = {
  productSearch: (doc: object, collection: string, db: string) => Promise<product[]>;
  productArray: Array<Array<product>>;
  setProductArray: Dispatch<SetStateAction<product[][]>>;
  selectedProduct: product;
  setSelectedProduct: Dispatch<SetStateAction<product>>;
  productAdd: (productToAdd: productToAdd) => Promise<number>;
 productCommentAdd: (comments: comments, id: string, category: string) => Promise<any>
};

export const ProductContext = createContext<ProductContext>(
  {} as ProductContext
);

export const ProductContextProvider = ({ children }: any) => {
  const [productArray, setProductArray] = useState<product[][]>([[{  id: "",
  name: "",
  img: [],
  price: 0,
  description: "",
  price_ID:'',
  color: [],
  notes:0,
  size: [],
  category: [],
  tag: [],
  quantity: 0,
  comments: [],
  custom:{}
}]]);

  const [selectedProduct, setSelectedProduct] = useState<product>({  id: "",
  name: "",
  img: [],
  price: 0,
  notes:0,
  price_ID:'',
  description: "",
  color: [],
  size: [],
  category: [],
  tag: [],
  quantity: 0,
  comments: [],
  custom:{}
});
const [env,setEnv] = useState<string>('dev');

useEffect(()=>{
  if(window.location.hostname === 
    "localhost"){
      setEnv('dev')
    } else {
      setEnv('prod')
    }
},[])

  const productSearch = async (
    doc: object,
    collection: string,
    db: string
  ): Promise<product[]> => {
    try {
      let envAdress: string | URL ;
      if (env === 'dev') {
        envAdress = process.env.FETCHPRODUCTSEARCHDEV || '';
      } else {
        envAdress = process.env.FETCHPRODUCTSEARCHPROD || '';
      }
      console.log("try productsearch");
      var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doc, collection, db }),
      };

      const reponseFindProduct = await fetch(
        envAdress,
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

  const productAdd = async (
    productToAdd: object,
  ): Promise<number> => {
    try {
      let envAdress: string | URL ;
      if (env === 'dev') {
        envAdress = process.env.FETCHPRODUCTADDDEV || '';
      } else {
        envAdress = process.env.FETCHPRODUCTADDPROD || '';
      }
      console.log("try productsearch");
      var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      };

      const reponseAddProduct = await fetch(
      envAdress,
        myInit
      );
      const data: any = await reponseAddProduct.json();
     return data.code;
      
    } catch (err) {
      console.log(err);
      return 404    }
  };


const productCommentAdd = async (comments:comments,id:string,category:string) => {
 
  try{
    var myInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({comments,id,category}),
    };
    let envAdress:string | URL;
    if(env === 'dev'){
    envAdress = 'http://localhost:8080';
    } else{
      envAdress = 'http://server.brodiz.com'
    }
    const reponseAddComment = await fetch(
      envAdress + '/product/commentAdd',
        myInit
      );
      const response = await reponseAddComment.json();
      return response
  }catch(err){
    console.log(err)
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
        productAdd,
        productCommentAdd
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useGlobalContext = () => useContext(ProductContext);
