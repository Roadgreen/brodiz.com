"use client";
import { handleWebpackExternalForEdgeRuntime } from "next/dist/build/webpack/plugins/middleware-plugin";
import { userAgentFromString } from "next/server";
import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";


interface pageView {
    url: string,
    referrer: string,
    userAgent: string,
    visitorId:string,
    userId: string,
    sessionId: string,
    timeOnPage: Date,
    screenResolution: string,
    product: object,
    pageCategory: string,
    data: object
}
interface event {
    url: string,
    eventName: string,
    sessionId:string,
    data:object,
}

type AnalyticsContext = {
    sendPageview:(pageView:pageView) => void;
    sendEvent:(event:event) => void;
};

export const AnalyticsContext = createContext<AnalyticsContext>(
  {} as AnalyticsContext
);

export const AnalyticsContextProvider = ({ children }: any) => {
  useEffect(()=>{
if(localStorage.getItem('sessionId')!== null){
  const sessId = localStorage.getItem('sessionId') as string ;
  setIsSessionId(sessId);
} else if(localStorage.getItem('userId') !== null){
  const userId = localStorage.getItem('userId') as string ;
  setIsUserId(userId)
}
  },[])
    const [startTime, setStartTime] = useState<number | null>(null);
  const [isSessionId,setIsSessionId] = useState('');
  const [isUserId,setIsUserId] = useState('');

const sendPageview = async (pageView: pageView) =>{

const userIdCheck = () => {
    let findId;
    if(isUserId === ''){
       return findId = '';
    } else {
        return findId = isUserId;
    }
    return findId;
}
    pageView.url = typeof window !== undefined ? window.location.href : '';
    pageView.referrer = typeof window !== undefined ? window.document.referrer : '';
    pageView.userId =  userIdCheck();
    pageView.userAgent = typeof window !== undefined ? window.navigator.userAgent : '';
    pageView.screenResolution = typeof window !== undefined ? `${window.screen.width},${window.screen.height} ` : '';
    pageView.timeOnPage = new Date(); 

    const generateVisitorId = (): string => {
        // Essayez de récupérer l'identifiant de visiteur stocké localement
        let visitorId = localStorage.getItem('visitorId');
      
        // Si aucun identifiant de visiteur n'est stocké localement, générez-en un nouveau
        if (!visitorId) {
          visitorId = `visitor_${Math.floor(Math.random() * 1000)}`;
          localStorage.setItem('visitorId', visitorId);
        }
      
        return visitorId;
      };

      const generateSessionsId = async () => {
        let newSessionId: string;
    
        const isSessionExpired = () => {
          const sessionExpirationTime = localStorage.getItem('sessionExpiration');
          if (!sessionExpirationTime) {
            return true; // Expired if no expiration time is set
          }
    
          const currentTime = new Date().getTime();
          return currentTime > parseInt(sessionExpirationTime, 10);
        };
    
        if (isSessionId === null || isSessionId === undefined || isSessionExpired()) {
          newSessionId = 'session_' + Math.floor(Math.random() * 1000) + '_' + 1;
          localStorage.setItem('sessionId', newSessionId);
    
          // Set expiration time for the new session (2 hours)
          const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
          localStorage.setItem('sessionExpiration', expirationTime.toString());
        } else {
          return newSessionId = isSessionId;
        }
    
        return newSessionId;
      };
    

    const sessionIdResult = await generateSessionsId();
    const visitorIdResult = await generateVisitorId();
    pageView.sessionId = sessionIdResult;
    pageView.visitorId = visitorIdResult;

        var myInit = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pageView),
        };
        if(typeof window !== undefined && window.location.hostname !== "localhost"){
          const pageViewSend = await fetch(
            process.env.FETCHANALYTICSPAGEVIEW ||
              "http://192.168.1.166:8080/analytic/page_view",
            myInit
          );
          try{
            const data = await pageViewSend.json();
            console.log(data);
            return data;
          }catch(err){
            return []
            console.log(err);
          }
        }
        
      
      
      
}
const sendEvent = async (event: event) =>{
    const isSessionId = await localStorage.getItem('sessionId') as string;

    event.url = typeof window !== undefined ? window.location.href: '';
    event.sessionId = isSessionId;
    var myInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    };

    if(typeof window !== undefined && window.location.hostname !== "localhost"){
      const pageViewSend = await  fetch(
        process.env.FETCHANALYTICSEVENT ||
          "http://192.168.1.166:8080/analytic/event",
        myInit
      );
      try{
        const data = await pageViewSend.json();
        console.log(data);
        return data;
      }catch(err){
        return []
        console.log(err);
      }
    }
   
  
  
}

  return (
    <AnalyticsContext.Provider
      value={{
        sendPageview,
        sendEvent
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useGlobalContextAnalytics = () => useContext(AnalyticsContext);
