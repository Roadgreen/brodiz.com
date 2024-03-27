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
import HandleUploadProduct from "../api/upload/uploadProductImg";

type AdminContext = {
    uploadImage: (file: File,productId:string) => Promise<any>;
};

export const AdminContext = createContext<AdminContext>(
  {} as AdminContext
);

export const AdminContextProvider = ({ children }: any) => {
  const [env,setEnv] = useState<string>('dev');
  useEffect(()=>{
    if(window.location.hostname === 
      "localhost"){
        setEnv('dev')
      } else {
        setEnv('prod')
      }
  },[])

const uploadImage = async (file:any,productId:string) =>{
  console.log('o est dans le uplaodimage')
 const imgPath = await HandleUploadProduct(file,productId);
 await imgPath
 return  imgPath;
}


  return (
    <AdminContext.Provider
      value={{
       uploadImage
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useGlobalContextAdmin = () => useContext(AdminContext);
