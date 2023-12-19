/** @type {import('next').NextConfig} */
const nextConfig = {
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
    }
}

module.exports = nextConfig
