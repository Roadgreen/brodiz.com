import { useContext,createContext,useState } from "react";


type CommandeContext = {
commandAdd:(Command:Command) => Promise<"ok" | "non ok">,
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

export const CommandeContext = createContext<CommandeContext>(
    {} as CommandeContext
  );

  export const CommandeContextProvider = ({ children }: any) => {
  const commandAdd = async (Command:Command) => {
    var myInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Command),
      };

    
  const sendCommand = await  fetch(
        process.env.FETCHCOMMANDSEARCH ||
          "http://localhost:8080/command/commandadd",
        myInit
      );

      const data = await sendCommand.json();
      if(data.code === 202){
return 'ok'
      } else if(data.code === 404){
return 'non ok'
      }
      return 'ok'
  }

    return (
      <CommandeContext.Provider
        value={{
        commandAdd
        }}
      >
        {children}
      </CommandeContext.Provider>
    );
  };
  
  export const useGlobalContextCom = () => useContext(CommandeContext);