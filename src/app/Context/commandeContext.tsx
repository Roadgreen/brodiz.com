"use client"

import { useContext,createContext,useState } from "react";


type CommandeContext = {
commandAdd:(Command:Command) => Promise<"ok" | "non ok">,
commandCheck:(UserCommandCheck:UserCommandCheck) =>  {}
}
interface Command {
  
    useremail: string,
    userid:string,
    adress: {
      adresse: string,
      post: string,
      ville: string,
      pays:string
    },
    product: Array<Object>,
    livprice: number,
    totalprice: number,
}
interface UserCommandCheck {
  email:string
}

export const CommandeContext = createContext<CommandeContext>(
    {} as CommandeContext
  );

  export const CommandeContextProvider = ({ children }: any) => {

    const commandCheck = async (User:UserCommandCheck) => {
      console.log(User)
      var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(User),
      };
      const checkCommand = await  fetch(
        process.env.FETCHCOMMANDSEARCH ||
          "http://localhost:8080/command/commandCheck",
        myInit
      );
      try{
        const data = await checkCommand.json();
        console.log(data);
        return data;
      }catch(err){
        return []
        console.log(err);
      }
    
    }
  const commandAdd = async (Command:Command) => {
    console.log(Command);
    var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Command),
      };
  

    console.log('on est dans commandeAdd function');
  const sendCommand = await  fetch(
        process.env.FETCHCOMMANDSEARCH ||
          "http://localhost:8080/command/commandAdd",
        myInit
      );

      const data = await sendCommand.json();
      console.log(data);
      if(data.code === 202){
        
        console.log('data.code is 202')
return 'ok'
      } else if(data.code === 404){
        console.log('data.code is 404')

return 'non ok'
      }
      return 'ok'
  }

    return (
      <CommandeContext.Provider
        value={{
        commandAdd,
        commandCheck
        }}
      >
        {children}
      </CommandeContext.Provider>
    );
  };
  
  export const useGlobalContextCom = () => useContext(CommandeContext);