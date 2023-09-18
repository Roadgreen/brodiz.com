'use client'

import Connected from "@/components/Compte/connected/connected"
import UserContextProvider from '@/app/Context/UserAccountContext'


export default function AccountUser ({params}: {params:{id:string}}) {
    
    return (
        <UserContextProvider>     
       <Connected id={params.id}/>
        </UserContextProvider>

    )
}