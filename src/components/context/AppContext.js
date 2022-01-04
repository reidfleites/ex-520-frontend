/* eslint-disable react-hooks/exhaustive-deps */
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
 

 
 const MyProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    

    
    useEffect(()=>{
        (async()=>{
            const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/currentUser`,{method:"GET",credentials:"include"});
            const data=await response.json();
            setCurrentUser(prev=>({prev,...data}));
           
        })();
    },[])
 
    return (
        <AppContext.Provider value={[
            currentUser,
            setCurrentUser
        ]} >
            {children}
        </AppContext.Provider>
    );
};
export default MyProvider;
export const AppContext = createContext();
