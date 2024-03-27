import React, {useState} from 'react'
import { useGlobalContextBlog } from '@/app/Context/blogContext'
import styles from './addBlogPost.module.css'
import { redirect } from 'next/navigation'
import { HandleUploadBlog } from '@/app/api/upload/uploadProductImg'
import handleUploadImage from '@/app/api/upload/uploadcustomserver'

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

export default function AddBlogPost() {
    const {articleAdd} = useGlobalContextBlog();
    const [ok,setOk] = useState<Boolean>(false);
const [article,setArticle] = useState<article>({
    id:'',
    name:'',
    date: new Date(),
    description:'',
    H1:'',
    P1:'',
    H2:'',
    P2:'',
    H3:'',
    P3:'',
    img:''
})
const handleUpload = async (e:any)=>{
    console.log(e);
if(e.target.files[0]){
    const file = e.target.files[0];
  const result = await  HandleUploadBlog(file,article.id)
  if('imagePath' in result){
    const url = result.imagePath;
    console.log(url)
    change('img',url)
  }
  
 
}
}
const change = (field:string,value:string) =>{
    setArticle((prevArticle) => ({
        ...prevArticle,
        [field]: value,
      }));
}

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
    const newArticle = await articleAdd(article);
    console.log(newArticle.ok);
    if(newArticle.ok){
        setOk(true);
    }else{
        
    }

    }
  return (
    <div>
        <h1>Blog Article:</h1>
       {ok ? <div><p>Article Ajouté avec succès</p> <button onClick={()=>{redirect('/admin')}}>Recharger la page</button></div> : ''}
        <div className={styles.container}>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className={styles.container}>
                <input onChange={(e)=>{change('id',e.target.value)}} placeholder='id'/>
                    <input onChange={(e)=>{change('name',e.target.value)}} placeholder='name'/>
                    <textarea onChange={(e)=>{change('description',e.target.value)}} placeholder='description'/>
                    <input onChange={(e)=>{change('H1',e.target.value)}} placeholder='h1'/>
                    <textarea onChange={(e)=>{change('P1',e.target.value)}} placeholder='p1'/>
                    <input onChange={(e)=>{change('H2',e.target.value)}} placeholder='h2'/>
                    <textarea onChange={(e)=>{change('P2',e.target.value)}} placeholder='p2'/>
                    <input onChange={(e)=>{change('H3',e.target.value)}} placeholder='h3'/>
                    <textarea onChange={(e)=>{change('P3',e.target.value)}} placeholder='p3'/>
                    <input type='file' onChange={(e)=>{handleUpload(e)}} />
                    <button>Submit</button>
                   
        
                </div>
            </form>
        </div>
    </div>
  )
}
