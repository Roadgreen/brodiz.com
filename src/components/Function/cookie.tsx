
import { cookies } from 'next/headers'

export const getCookie = (nameCookie:string)=>{

    const cookieStore = cookies()
    const theme = cookieStore.get(nameCookie)
    return theme

}

