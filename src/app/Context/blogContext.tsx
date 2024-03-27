"use client";

import React,{createContext,useContext,useEffect,useState} from 'react'

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
type BlogContext = {
   articleAdd:(article:article)=> Promise<any>;
   allArticle:()=>Promise<Array<Object>>;
   articleReader: (name:string) => Promise<{code:number,articles:{id:string,
    name:String,
    date:Date,
    description:string,
    H1:string,
    P1:string,
    H2:string,
    P2:string,
    H3:string,
    P3:string,
    img:string,}}>
  };
  
  export const BlogContext = createContext<BlogContext>(
    {} as BlogContext
  );

  export const BlogContextProvider = ({ children }: any) => {
    const [env,setEnv] = useState<string>('dev');
    const [articles,setArticlesl] = useState<Object>({})

    useEffect(()=>{
        if(window.location.hostname ===
          "localhost"){
            setEnv('dev')
          } else {
            setEnv('prod')
          }

      },[])

    const articleAdd = async (article:article)=>{
        const data = article;
        let envAdress;
        if (env === 'dev') {
            envAdress = process.env.FETCHADDARTICLEBLOGDEV || '';
          } else {
            envAdress = process.env.FETCHADDARTICLEBLOGPROD || '';
          }
          var myInit = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
        try{
            const result = await fetch(envAdress,myInit);
            console.log(result);
            return result;
        }catch(err){
            console.log(err)

        }

    }

    const allArticle = async (): Promise<Array<Object>>=>{
        let envAdress;
        if (env === 'dev') {
            envAdress = process.env.FETCHARTICLEBLOGDEV || '';
          } else {
            envAdress = process.env.FETCHARTICLEBLOGPROD || '';
          }
          var myInit = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },

          };
          try{
            const result = await fetch(envAdress,myInit);
            const codeResponse = await result.json();
console.log(codeResponse.articles);

return codeResponse.articles
          }catch(err){
            console.log(err);
return [{}]
          }
    }

    const articleReader = async (id:string)=>{
        let envAdress;
        let imgUrl;
        if (env === 'dev') {
            envAdress = process.env.FETCHONEARTICLEBLOGDEV || '';
            imgUrl = process.env.URLIMGBLOGDEV || '';

          } else {
            envAdress = process.env.FETCHONEARTICLEBLOGPROD || '';
            imgUrl = process.env.URLIMGBLOGPROD || '';

          }
          var myInit = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            
          };
          try{
            const result = await fetch(envAdress +`${id}` ,myInit);
            const codeResponse = await result.json();
console.log(codeResponse);
 const articles = codeResponse.articles;
articles.img = `${imgUrl}${articles.img}`
console.log(articles)
return articles
          }catch(err){
            console.log(err);

          }
    }


return(
<BlogContext.Provider value={{articleAdd,allArticle,articleReader}}>{children}</BlogContext.Provider>
)
  }

  export const useGlobalContextBlog = () => useContext(BlogContext);