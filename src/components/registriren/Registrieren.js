/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { MdOutlineRemoveRedEye} from "react-icons/md";
import {AiOutlineEyeInvisible} from "react-icons/ai";
import {BsCheckCircleFill} from "react-icons/bs";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import NotApprovedUser from "../notAprovedUsers/NotAprovedUser";
import { useNavigate } from 'react-router-dom';



function Registriren() {
  const [login, setLogin] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loginValided, setLoginValided] = useState(false);
  const [emailValidaded,setEmailValided]=useState(false);
  const [passwordValided, setPasswordValided] = useState(false);
  const [validation, setValidation] = useState(false);
  const [message] = useState("");
  const [fname, setFname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentUser,setCurrentUser] = useContext(AppContext);
  const [inputType,setInputType]=useState("password");
  const [inputType2,setInputType2]=useState("password");
  const navigate = useNavigate();


  const [passw,setPassw]=useState(false);
  const [passw2,setPassw2]=useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLogin = (e) => {
    let iLogin = e.target.value;
    console.log("wasss");
    if (iLogin.length > 5) {
      setLoginValided(true);
    } else {
      setLoginValided(false);
    }
    setLogin(iLogin);
  };

  const handlePassword1 = (e) => {
    const iPassword = e.target.value;
   
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(iPassword)) {
      setPasswordValided(true);
    }
    else{
      setPasswordValided(false);
    }
    setPassword1(iPassword);
  };

  const handlePassword2 = (e) => {
    const iPassword2 = e.target.value;
    setPassword2(iPassword2);
  };
  const handleEmail = (e) => {
    const iemail = e.target.value;
    if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(iemail)){
      setEmailValided(true);
    }
    else{
      setEmailValided(false);
    }
    setEmail(iemail);
  };
  const handleFname = (e) => {
    const iname = e.target.value;
    setFname(iname);
  };
  const handleLastName = (e) => {
    const ilastName = e.target.value;
    setLastName(ilastName);
  };
  const clearForm = () => {
    setLastName("");
    setFname("");
    setLogin("");
    setPassword1("");
    setPassword2("");
    setEmail("");
    setEmailValided(false);
    setPasswordValided(false);
    setLoginValided(false);
  };

  const showPassw=()=>{
    setPassw(true);
    setInputType("text");
    
  }
  const showPassw2=()=>{
    setPassw2(true);
    setInputType2("text");
    
  }
  const notShowPassw=()=>{
    setPassw(false);
    setInputType("password");
  }
  const notShowPassw2=()=>{
    setPassw2(false);
    setInputType2("password");
  }

  const handleButton = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body: JSON.stringify({
        user: {
          name: fname,
          lastName: lastName,
          email: email,
          login: login,
          password1: password1,
          password2: password2,
        },
      }),
    });
    const user = await response.json();
   setCurrentUser(prev=>({...prev,...user}));
    clearForm();
    navigate('/');
  };

  useEffect(() => {
    setValidation(loginValided && passwordValided && password1 === password2);
  }, [loginValided, passwordValided, password1, password2]);
  

  return (
    <div className="registrieren">
      {currentUser.login==="gast" &&(
        <form action="">
        <div>
          <label htmlFor="login">name:</label>
        </div>
        <input type="text" value={fname} onChange={handleFname} />
        <div>
          <label htmlFor="login">lastname:</label>
        </div>
        <input type="text" value={lastName} onChange={handleLastName} />
        <div>
         
          <label htmlFor="login">email:</label>
        </div>
        <div className="input-login">
        <input type="text" value={email} onChange={handleEmail} />
        {emailValidaded && <BsCheckCircleFill className="icon-valided"/>}
        
        </div>
        <div>
          <label htmlFor="login">login:</label>
        </div>
        <div className="input-login">
        <input type="text" value={login} onChange={handleLogin} />
        {loginValided && <BsCheckCircleFill className="icon-valided" />}
        
        </div>
        <div><sub className={loginValided || login===""?"div-valided":"div-notValided"}>*required, minimum 6 characters</sub> </div>
        <div>
          <label htmlFor="password1">password</label>
        </div>
        <div className="input-password">
        <input type={inputType} value={password1} onChange={handlePassword1}/>
        {passw?<MdOutlineRemoveRedEye className="icon-eye1" onClick={notShowPassw}/>:<AiOutlineEyeInvisible onClick={showPassw} className="icon-eye1"/>}
        {passwordValided && <BsCheckCircleFill className="icon-valided" />}
        </div>
        <div><sub className={passwordValided || password1===""?"div-validaded":"div-notValided"}>*required combination of numbers and letters</sub> </div>
        <div>
          <label htmlFor="password2">password(repeat)</label>
        </div>
        <div className="input-password">
        <input type={inputType2} value={password2} onChange={handlePassword2} />
        {passw2?<MdOutlineRemoveRedEye className="icon-eye1" onClick={notShowPassw2}/>:<AiOutlineEyeInvisible onClick={showPassw2} className="icon-eye1"/>}
        {password1===password2 && password1!=="" && <BsCheckCircleFill className="icon-valided"/>}
        </div>
        <div className="div-button">
          <button
            className="btn btn-primary"
            disabled={!validation}
            onClick={handleButton}
          >
            Register
          </button>
        </div>
        {message}
      </form>
      )}
      {currentUser.accesGroup==="notApprovedUser" && (<NotApprovedUser/>)}

    </div>
  );
}
export default Registriren;
