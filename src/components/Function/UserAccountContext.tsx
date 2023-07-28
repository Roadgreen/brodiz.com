import { useContext, createContext, useState, Dispatch, SetStateAction } from "react";

type UserContext = {
  CreateAccount: (User: User) => void;
  Login: (User: User) => void;
  FindUser: (User: UserSearch) => void;
  isConnected: any;
  isBuyers: any;
  isNews: any;
  userFind: any;
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
};
interface User {
  email: string;
  password: string;
  newsletter: boolean;
  date: string;
  collection: string;
}
interface UserSearch {
  email: string;
  collection:string;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export default function UserContextProvider({ children }: any) {
  const [userFind, setUserFind] = useState("Wait");
  const [isConnected, setIsConnected] = useState(false);
  const [isBuyers, setIsBuyers] = useState(false);
  const [isNews, setIsNews] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const CreateAccount = async (User: User) => {
    const { email, password, newsletter, date } = User;

    var myInit = {
      method: "POST",
      mode: "cors" as RequestMode,
      body: JSON.stringify({
        email,
        password,
        newsletter,
        date,
      }),
    };

    const response = await fetch(
      process.env.FETCHLOGIN || "http://localhost:8080/users/addUser",
      myInit
    ).then((res) => {
      console.log(res);
    });
  };

  const Login = async (User: User) => {
    const { email, password } = User;

    var myInit = {
      method: "POST",
      mode: "cors" as RequestMode,
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(
      process.env.FETCHLOGIN || "http://localhost:8080/users/login",
      myInit
    ).then((res) => {
      console.log(res);
    });
  };

  const FindUser = async (User: UserSearch) => {
    const { email,collection } = User;
console.log(collection)
    var myInit = {
      method: "POST",
      mode: "cors" as RequestMode,
      body: JSON.stringify({
        email,collection
      }),
    };

    const response = await fetch(
      process.env.FETCHLOGIN || "http://localhost:8080/users/findUser",
      myInit
    ).then((res) => {
      console.log('reponse du context',res);

    });
  };

  return (
    <UserContext.Provider
      value={{
        CreateAccount,
        Login,
        FindUser,
        isConnected,
        isBuyers,
        isNews,
        userFind,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
