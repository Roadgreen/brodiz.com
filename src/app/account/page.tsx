'use client'
import styles from './page.module.css'
import UserContextProvider from '@/components/Function/UserAccountContext'
import ConnectHub from '@/components/Compte/connectHub';

export default function Compte() {
  return (
     <UserContextProvider>
 
<ConnectHub/>

    </UserContextProvider>
  )
}
