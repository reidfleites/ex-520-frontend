import { useState,useContext } from "react/cjs/react.development";
import { istPasswValided } from "../validation/Validation";
import {AppContext} from "../context/AppContext";
function ChangePassword() {
  const [newPassw, setNewPassw] = useState("");
  const [altePassw,setAltePassw]=useState("");
  const [confirmedPasswd,setConfirmedPasswd]=useState("");
  const [paswValided, setPassValided] = useState(false);
  const [currentUser] = useContext(AppContext);

  const [message,setMessage]=useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handlePassword = (e) => {
    const ipassw = e.target.value;
    setPassValided(istPasswValided(ipassw));
    setNewPassw(ipassw);
  };
  const handleAltePassword = (e) => {
    const ipassw = e.target.value;
    setAltePassw(ipassw);
  };
  const handleConfirmPassword=(e)=>{
      const iconfirmpasswd=e.target.value;
      setConfirmedPasswd(iconfirmpasswd);
    
  }
  const setNewPassword = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/changepassword`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          login: currentUser.login,
          altepassword: altePassw,
          newpassword: newPassw,
        },
      }),
    });

    const data = await response.json();
    console.log(data);
    setNewPassw('');
    setAltePassw('');
    setConfirmedPasswd('');
  };

  return (
    <div className="change-passw">
      <form action="">
          <fieldset className="panel">
        <div>
          <label htmlFor="">actual password:</label>
        </div>
        <input type="text" onChange={handleAltePassword} value={altePassw}/>
        <div>
          <label htmlFor="">new password</label>
        </div>
        <input type="text" onChange={handlePassword} value={newPassw} />
        
        <div>
          <label htmlFor="">new password(repeat)</label>
        </div>
        <input type="text" onChange={handleConfirmPassword} value={confirmedPasswd}/>
        <div>
          <button onClick={setNewPassword}>change Password</button>
          {message}
        </div>
        </fieldset>
      </form>
    </div>
  );
}
export default ChangePassword;
