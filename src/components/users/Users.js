/* eslint-disable react-hooks/exhaustive-deps */
import {  useState } from "react";
import { useEffect } from "react";

import {FaUserAlt} from "react-icons/fa";
import {MdEmail} from "react-icons/md";


function Users(){
  const [users,setUsers]=useState([]);
   
    

    
    
const fetchData=async()=>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/getAllUsers`);
		const bdUsers = await response.json();
		setUsers(bdUsers);
        
}

const deleteUser=async(login)=>{
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteUser`,
  {method:"DELETE",credentials:"include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
      user: {
        login:login
        },
    })});
  fetchData();
  }

    useEffect(()=>{
        fetchData();
        
    },[])
    return(
        <div className="Home">
           
            <h1>
               All Users
            </h1>
            
            {users.map((user,index)=>{
                return(
                    <div className="card text-white bg-primary mb-3" key={index}>
                    <div className="card-header"><FaUserAlt/> {user.login}</div>
                    <div className="card-body">
                      <h5 className="card-title"><MdEmail/> {user.email}</h5>
                      <p className="card-text">Name : {user.name} {user.lastName}</p>
                      <h4 className="card-title">{user.accessGroup}</h4>
                      <div><button className="btn-danger"  onClick={()=>deleteUser(user.login)}>Delete</button></div>
                    </div>
                    
                  </div>
                
                );
            })}

        </div>
    );
}
export default Users;