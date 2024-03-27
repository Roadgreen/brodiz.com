"use client"
import { useContext,useEffect,useState } from 'react'
import styles from './blogPage.module.css'
import { useGlobalContextBlog } from '@/app/Context/blogContext'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface article{
    id:string,
    name:string,
    date:Date,
    description:string,
    H1:string,
    P1:string,
    H2:string,
    P2:string,
    H3:string,
    P3:string,
    img:string,
    }{}

export default function BlogPage() {
  const router = useRouter()
  const [envAdress,setEnvAdress] = useState<any>('');
    const [articlesArray,setArticlesArray] = useState<Array<Object>>(['']);
const {allArticle} = useGlobalContextBlog();

useEffect(() => {
  
    
    if(typeof window !== undefined && typeof process.env.URLIMGBLOGDEV !== undefined && typeof process.env.URLIMGBLOGPROD !== undefined && window.location.hostname === 'localhost'){
       setEnvAdress(process.env.URLIMGBLOGDEV)
        setEnvAdress(process.env.URLIMGBLOGPROD);
    }
    const fetchData = async () => {
      try {
        const data = await allArticle();
        console.log(data);
        setArticlesArray(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    };

    fetchData();
  }, [allArticle, setArticlesArray]);

  const handleClick = (e:string) => {
    console.log(e);
    router.push(`/blog/${e}`)
  }

const BlogArticle = () => {
  
        return (
            <div  className={styles.blogArticleContainer}>
   {articlesArray.map((x: any, i: number) => {
                return (
                  <div
                    className={styles.blogArticle}
                    key={i}
                    onClick={()=>{handleClick(x._id)}}
                  >
                    <div className={styles.imgContainer}>
                        <Image className={styles.img} src={`${envAdress}${x.img}`} fill alt=''/>
                    </div>
                    <h4>{x.name}</h4>
                    <p className={styles.description}>{x.description}</p>
                    
                  </div>
                );
              })}
            </div>
         
        )
    }


  return (
    <div className={styles.container}>
       
       
        {BlogArticle()}
    </div>

  )
}
