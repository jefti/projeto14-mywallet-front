import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export const UserContext = createContext()

export default function UserProvider({children}){
    const lsuser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(lsuser !== null ? lsuser : {});
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(location);
        if(lsuser === null){
            if(location.pathname !== "/cadastro"){
                navigate("/");
            }
        }else{
            if(location.pathname !== "/cadastro"){
                navigate("/home");
            }

        }
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}