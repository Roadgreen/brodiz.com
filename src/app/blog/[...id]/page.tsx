import BlogArticle from "@/components/Blog/BlogArticle/blogArticle"
export default function BlogArticles({params}:{params:{id:string}}) {

  return (
    <div>
        <BlogArticle id={params.id}/>
    </div>
  )
}
