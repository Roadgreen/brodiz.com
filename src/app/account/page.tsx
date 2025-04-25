
import styles from './page.module.css'
import UserContextProvider from '@/app/Context/UserAccountContext'
import ConnectHub from '@/components/Compte/connectHub';
import { getCookie } from '../../components/Function/cookie'

export default function  Compte() {
const Cookie = getCookie('SanAndreas');
  return (
     <UserContextProvider>
 
<ConnectHub Cookie={Cookie}/>

    </UserContextProvider>
  )
}
