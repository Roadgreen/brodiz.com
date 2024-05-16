"use client"
import React from 'react'
import AddBlogPost from "@/components/adminComponent/addBlogPost/addBlogPost"

import { useState } from 'react'
import { AdminContextProvider } from '../../../app/Context/adminContext'
import { useGlobalContextAdmin } from '../../../app/Context/adminContext'
import styles from './page.module.css'
import AddProduct from '@/components/adminComponent/addProduct/addProduct'

export default function AdminPageHome() {
  const [pages,setPages] = useState(0);

  return (
    <AdminContextProvider>
    <div><h1>Admin</h1>
    <div className={styles.container}>
      <div className={styles.buttonChoice} onClick={()=>{setPages(1)}}>Ajout d&apos;article</div>
      <div className={styles.buttonChoice} onClick={()=>{setPages(2)}}>Data</div>
      <div className={styles.buttonChoice} onClick={()=>{setPages(3)}}>Blog post</div>

    </div>
<div>
{pages === 1 ? <AddProduct/>: ''}
{pages === 3 ? <AddBlogPost/>: ''}
</div>
    </div>

    </AdminContextProvider>
  )
}
