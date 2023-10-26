"use client";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";


type AdminContext = {
    uploadImage: (file: File) => void;
};

export const AdminContext = createContext<AdminContext>(
  {} as AdminContext
);

export const AdminContextProvider = ({ children }: any) => {
const uploadImage = async (file:any) =>{
if(!file) return
try{
    const data = new FormData()
    data.set('file',file);
    const res = await fetch('api/upload/upload',{
        method: 'Post',
        body: data
    })
    
    const result = res.json();

        return  result;
    
}catch(err){
    console.log(err);
    return err
}
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
