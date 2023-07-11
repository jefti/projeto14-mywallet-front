import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export default function UserProvider({children}){
    const lsuser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(lsuser !== null ? lsuser : {});
    const navigate = useNavigate();
    useEffect(()=>{
        if(lsuser === null){
            navigate("/");
        } else{
            navigate("/home");
        }
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}