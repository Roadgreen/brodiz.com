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
    uploadImage: (file: File) => Promise<any>;
};

export const AdminContext = createContext<AdminContext>(
  {} as AdminContext
);

export const AdminContextProvider = ({ children }: any) => {
const uploadImage = async (file:any) =>{
  console.log(file,'log du files');
if(!file) return
try{
    const data = new FormData()
    data.set('file',file);
    console.log(data,'log du data');

    const res = await fetch('/api/upload',{
        method: 'POST',
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: data
    });
    
    console.log(res);

        return  res;
    
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
