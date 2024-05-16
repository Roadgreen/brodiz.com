'use client'

import Connected from "@/components/Compte/connected/connected"
import { useEffect } from "react";
import UserContextProvider from '@/app/Context/UserAccountContext'
import AdminPageHome from "@/components/adminComponent/admin/page";


export default function AccountUser ({params}: {params:{id:string}}) {
   
    const id = params.id;
    if(id === '6646268d61d411f2bf372a0e'){
        
return(<AdminPageHome/>)
    }else{
        return (
            <UserContextProvider>     
           <Connected id={id}/>
            </UserContextProvider>
    
        )
    }
    }
  