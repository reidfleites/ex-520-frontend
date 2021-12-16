
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import {AppContext} from "../context/AppContext";

function UserLogged(){
    const [currentUser,setCurrentUser] = useContext(AppContext);
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;


    const logout =async()=>{
        console.log("loggedOut");
        const response=await fetch(`${backendUrl}/logout`,{method:"GET",credentials:"include"});
       
          const user=await response.json();
          if(response.ok){
          setCurrentUser(prev=>({...prev,...user}));
          console.log(user);
          navigate('/');
        }
       
       }
    return(
        <div className="userLogged">
           <h5><span> user:</span>{currentUser.login}</h5>
           <h5><span>acces:</span>{currentUser.accesGroup}</h5>
           {currentUser.accesGroup!=="gast" && (<button className="btn btn-primary" onClick={logout}>logout</button>)}
        </div>
    )
}
export default UserLogged