"use client"
import { useGlobalContextBlog } from "@/app/Context/blogContext"
import { useEffect, useState } from "react"
import styles from './blogArticle.module.css'
import Image from "next/image"
interface int{
    id:string
}
export default function BlogArticle({id}: int) {

    const {articleReader} = useGlobalContextBlog();
    const [article,setArticle] = useState<any>({id:'',
        name:'',
        description:'',
        H1:'',
        P1:'',
        H2:'',
        P2:'',
        H3:'',
        P3:'',
        img:'',})
useEffect(()=>{
const fetchData = async ()=>{
    const newArticle = await articleReader(id);
    console.log(newArticle)
    setArticle(newArticle);
}
fetchData()
},[articleReader,id])
  return (
    <div className={styles.container}>
        <div className={styles.containerImg}><Image className={styles.ig} src={article.img}  alt={`image de l'article de broderie`} fill/></div>
        <h1>{article.name}</h1>
        <p>{article.description}</p>
        <h2>{article.H1}</h2>
        <p>{article.P1}</p>
        <h2>{article.H2}</h2>
        <p>{article.P2}</p>
        <h2>{article.H3}</h2>
        <p>{article.P3}</p>
    </div>
  )
}
