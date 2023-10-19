"use client"
import { promises } from "dns";
import React,{ useContext, createContext, useState, Dispatch, SetStateAction } from "react";

type UserContext = {
  CreateAccount: (User: User) => void;
  Login: (User: UserConnect) => void;
  FindUser: (User: UserSearch) => void;
  UserConnected:(id:string) => Promise<{user:Object, status: string,code:number}>;
  isConnected: any;
  isBuyers: any;
  isNews: any;
  userFind: any;
  userEmail: string;
  userPswd:string;
  userData: any;
  setUserEmail: Dispatch<SetStateAction<string>>;
  setUserPswd: Dispatch<SetStateAction<string>>;
  setIsNews: Dispatch<SetStateAction<number>>;
  setUserData: Dispatch<SetStateAction<any>>;
};

interface User {
  email: string;
  password: string;
  newsletter: boolean;
  date: string;
  collection: string;
}
interface UserConnect {
  email:string;
  password:string,
  collection:string
}
interface UserSearch {
  email: string;
  collection:string;
}
interface UserData {
  email: string;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export default function UserContextProvider({ children }: any) {
  const [userFind, setUserFind] = useState("Wait");
  const [isConnected, setIsConnected] = useState(false);
  const [isBuyers, setIsBuyers] = useState(false);
  const [isNews, setIsNews] = useState(2);
  const [userEmail, setUserEmail] = useState("");
  const [userPswd,setUserPswd] = useState("");
  const [userData,setUserData] = useState<any>({});
  
  const CreateAccount = async (User: User) => {
    const { email, password, newsletter, date,collection } = User;

    var myInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        newsletter,
        date,
        collection
      }),
    };
    console.log('dans le createAccount function',email,collection,)
    const response = await fetch(
      process.env.FETCHLOGIN || "http://localhost:8080/users/addUser",
      myInit
    );
      const data = await response.json();
      console.log(data);
      if(data.code === 202){
        await localStorage.setItem("token",data.token);
      }
      return data;
    
  };

  const Login = async (User: UserConnect):Promise<{code:number,id:string,user:object} | undefined | void> => {
    try{
      const { email, password,collection } = User;

      var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          collection
        }),
      };
  
      const response = await fetch(
        process.env.FETCHLOGIN || "http://localhost:8080/users/login",
        myInit
      );
      const resData = await response.json()
      
     if(resData.code === 202){
      const token = resData.token;
      const user = await resData.user;
      const id = await resData.id;
      const email = await user.email.toString();
      console.log(user);
      
  await localStorage.setItem("token",token);
    return {code: 202,id: user._id,user};
     } else if(resData.code === 404){
      return {code: 404,id: '',user:{}}
     }
    } catch(err){
      console.log(err);
      return {code: 404, id:'null',user:{}}
    }
    }

 const FindUser = async (User: UserSearch): Promise<{code:number,status:string}> => {
  try {
    const { email, collection } = User;
    const data = { email, collection };
    console.log(collection, email);

    var myInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      process.env.FETCHLOGIN || "http://localhost:8080/users/findUser",
      myInit
    );

    if (response.ok) {
      // Assuming the server returns a JSON object with a "status" property
      const result = await response.json();
      if(result.code === 404){
        setUserFind('register');
      } else if(result.code === 202){
        setUserFind('connect');
      }
      return result
    } else {
      throw new Error("Failed to fetch user.");
    }
  } catch (err) {
    console.error(err);
    return {code: 1 ,status: 'err'};
  }
};
const UserConnected = async (id:string) : Promise<{ code:number, status:string, user:Object}> => {
 try{console.log(id);
 var myInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
 const Token = await localStorage.getItem("token");
 const response = await fetch(
  process.env.FETCHLOGIN || `http://localhost:8080/users/${id}/${Token}`,
  myInit
);
const data = await response.json();
console.log(data);
return data
}catch(err){
return {code: 404,status: 'Utilisateur non trouvé',user:{}}
}}
  return (
    <UserContext.Provider
      value={{
        CreateAccount,
        Login,
        FindUser,
        UserConnected,
        isConnected,
        isBuyers,
        isNews,
        userFind,
        userEmail,
        userPswd,
        userData,
        setUserEmail,
        setUserPswd,
        setIsNews,
        setUserData,

      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export const useGlobalContextUser = () => useContext(UserContext);