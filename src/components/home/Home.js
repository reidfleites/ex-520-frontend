/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useContext, useEffect } from "react";

import {FaUserAlt} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {AppContext} from "../context/AppContext";
import NotAprovedUser from "../notAprovedUsers/NotAprovedUser";


function Home(){
    const [users,setUsers]=useState([]);
    const [currentUser] = useContext(AppContext);
    

    
    
const fetchData=async()=>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getMembers`);
		const bdUsers = await response.json();
		setUsers(bdUsers);
        
}

    useEffect(()=>{
        fetchData();
        
    },[])
    return(
        <div className="home">
           
            <h1>
                Welcome to my Site
            </h1>
            
            {currentUser.accesGroup==="notApprovedUser" && <NotAprovedUser />}
            {currentUser.accesGroup==="member" &&(users.map((user,index)=>{
                return(
                    <div className="card text-white bg-primary mb-3" key={index}>
                    <div className="card-header"><FaUserAlt/> {user.login}</div>
                    <div className="card-body">
                      <h5 className="card-title"><MdEmail/> {user.email}</h5>
                      <p className="card-text">Name : {user.name} {user.lastName}</p>
                    </div>
                  </div>
                
                );
            }))}
            

        </div>
    );
}export default Home;