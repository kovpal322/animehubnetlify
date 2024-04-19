import {useContext} from "react";
import {userContext} from "../context/userContext.jsx";

export const useUserContext=()=>{
    const context=useContext(userContext)

    if(!context){
        throw new Error("userContext error")
    }


    return context
}