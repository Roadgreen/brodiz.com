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
  custom:{
    custom:Boolean,
    customName: string,
    customSelect: Array<string>,
    customType:string,
    customInputPattern:string,
    customResult:string

  }
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
  custom:{
    custom:Boolean,
    customName: string,
    customSelect: Array<string>,
    customType:string,
    customInputPattern:string,
    customResult:string

  }
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
  custom:{custom:false,
    customName: '',
    customSelect: [],
    customType: '',
    customInputPattern:'',
    customResult:''}
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
  custom:{custom:false,
    customName: '',
    customSelect: [],
    customType: '',
    customInputPattern:'',
    customResult:''}
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
      let urlImg;
      if (env === 'dev') {
        envAdress = process.env.FETCHPRODUCTSEARCHDEV || '';
        urlImg = process.env.URLIMGDEV;
      } else {
        envAdress = process.env.FETCHPRODUCTSEARCHPROD || '';
        urlImg = process.env.URLIMGPROD;
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
      console.log(data)
      if (data.code === 202) {
       const product = await data.Product; 
       console.log(product);
       if(product[0].category.includes("Customisation")){
        return data.Product;
       }else{
        const product = await data.Product; 
        for (let i = 0; i < product.length; i++) {
          console.log(product);
          // Vérifiez si l'objet a une propriété 'img' et si 'img' est un tableau non vide
          if (product[i].img && product[i].img.length > 0) {
            console.log(product)
              // Ajoutez la nouvelle chaîne à la position 0 de la première image
              for (let e = 0; e < product[i].img.length; e++) {
                console.log(product[i].img);
              product[i].img[e][0] = urlImg + product[i].img[e][0];
              console.log(product[i].img);
          }}
      }
       }
       
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
