/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/uploadImg/getImage/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/uploadImg/getBlogImage/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/uploadImg/getProductImage/**',
          },
        ],
      },
    env:{
        FETCHPRODUCTSEARCHDEV:"http://localhost:8080/product/productSearch",
        FETCHPRODUCTSEARCHPROD:"https://server.brodiz.com/product/productSearch",
        FETCHCOMMANDSEARCH:"https://server.brodiz.com/command/commandAdd",
FETCHPRODUCTADDPROD:"https://server.brodiz.com/product/productAdd",
FETCHPRODUCTADDDEV:"http://localhost:8080/product/productAdd",
FETCHANALYTICSPAGEVIEW:"https://server.brodiz.com/analytic/page_view",
FETCHANALYTICSEVENT:"https://server.brodiz.com/analytic/event",
FETCHLOGINDEV:"http://localhost:8080/users/login",
FETCHLOGINPROD:"https://server.brodiz.com/users/login",
ADDUSERDEV:"http://localhost:8080/users/addUser",
ADDUSERPROD: "https://server.brodiz.com/users/addUser",
USERCHANGESDEV:"http://localhost:8080/users/userchange",
USERCHANGESPROD:"https://server.brodiz.com/users/userchange",
FINDUSERDEV:"http://localhost:8080/users/findUser",
FINDUSERPROD:"https://server.brodiz.com/users/findUser",
USERCONNDEV:"http://localhost:8080/users/",
USERCONNPROD:"https://server.brodiz.com/users/",
FETCHPRODUCTIMGUPLOADDEV:"http://localhost:8080/uploadImg/product-img-upload/",
FETCHPRODUCTIMGUPLOADPROD:"https://server.brodiz.com/uploadImg/product-img-upload/",
URLIMGDEV:"http://localhost:8080/uploadImg/getProductImage/",
URLIMGPROD:"https://server.brodiz.com/uploadImg/getProductImage/",
FETCHONEARTICLEBLOGPROD:"https://server.brodiz.com/blog/articleReader/",
FETCHONEARTICLEBLOGDEV:"http://localhost:8080/blog/articleReader/",
FETCHARTICLEBLOGDEV:"http://localhost:8080/blog/allArticle",
FETCHARTICLEBLOGPROD:"https://server.brodiz.com/blog/allArticle",
FETCHADDARTICLEBLOGDEV:"http://localhost:8080/blog/articleAdd",
FETCHADDARTICLEBLOGPROD:"https://server.brodiz.com/blog/articleAdd",
FETCHBLOGIMGDEV:"http://localhost:8080/uploadImg/blog-img-upload/",
FETCHBLOGIMGPROD:"https://server.brodiz.com/uploadImg/blog-img-upload/",
URLIMGBLOGDEV:"http://localhost:8080/uploadImg/getBlogImage/",
URLIMGBLOGPROD:"https://server.brodiz.com/uploadImg/getBlogImage/"
    }
}

module.exports = nextConfig
