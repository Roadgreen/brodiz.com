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
  data.append('file', file);
    const res = await fetch('/api/upload',{
        method: 'POST',
        body: data
    })

    
  const returnData = await res.json();
  const convertPath = (inputPath: string) => {
    // Supprimer "public" du chemin
    let pathWithoutPublic = inputPath.replace("public", "");
  
    // Remplacer les doubles barres obliques échappées par une seule barre oblique
    let finalPath = pathWithoutPublic.replace(/\\\\/g, "/");
  
    // Remplacer les doubles barres obliques non échappées par une seule barre oblique
    finalPath = finalPath.replace(/\\/g, "/");
  
    return finalPath;
  }
console.log(returnData);
console.log(await convertPath(returnData.path));
const path = await convertPath(returnData.path);
        return path;
    
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
