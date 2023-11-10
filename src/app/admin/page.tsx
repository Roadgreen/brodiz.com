"use client"
import React from 'react'
import { useState } from 'react'
import { AdminContextProvider } from '../Context/adminContext'
import { useGlobalContextAdmin } from '../Context/adminContext'
import styles from './page.module.css'
import AddProduct from '@/components/adminComponent/addProduct/addProduct'

export default function Page() {
  const [pages,setPages] = useState(0);

  return (
    <AdminContextProvider>
    <div><h1>Admin</h1>
    <div className={styles.container}>
      <div className={styles.buttonChoice} onClick={()=>{setPages(1)}}>Ajout d&apos;article</div>
      <div className={styles.buttonChoice} onClick={()=>{setPages(2)}}>Data</div>
    </div>
<div>
{pages === 1 ? <AddProduct/>: ''}
</div>
    </div>

    </AdminContextProvider>
  )
}
