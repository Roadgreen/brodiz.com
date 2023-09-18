'use client'
import styles from './page.module.css'
import UserContextProvider from '@/app/Context/UserAccountContext'
import ConnectHub from '@/components/Compte/connectHub';

export default function Compte() {
  return (
     <UserContextProvider>
 
<ConnectHub/>

    </UserContextProvider>
  )
}
