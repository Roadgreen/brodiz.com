'use client'
import Text from '@/components/TexteSwitch/text'
import Cart from '@/components/Panier/panier'
import Recap from '@/components/Panier/recapPanier/recap'
import styles from './page.module.css'
import {useState,useContext} from 'react'
import { useGlobalContextUser } from '../Context/UserAccountContext'

export default function Panier() {
const {UserConnected} = useGlobalContextUser();






  return (
<div className={styles.Container}>
<Cart />
<Recap />
    </div>
  )
}
