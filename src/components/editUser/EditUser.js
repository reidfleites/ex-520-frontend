/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import { AppContext } from "../context/AppContext";

function EditUser() {
  const [user, setUser] = useState({});
  const [edition, setEdition] = useState(false);
  const [newname, setNewname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [setCurrentUser] = useContext(AppContext);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleName = (e) => {
    const iname = e.target.value;
    setNewname(iname);
  };
  const handleLastName = (e) => {
    const ilastName = e.target.value;
    setLastName(ilastName);
  };
  const handleEmail = (e) => {
    const iemail = e.target.value;
    setEmail(iemail);
  };
  const handleLogin = (e) => {
    const ilogin = e.target.value;
    setLogin(ilogin);
  };

  const editNewUser = (e) => {
    e.preventDefault();
    setEdition(!edition);
    setNewname(user.name);
    setLastName(user.lastName);
    setEmail(user.email);
    setLogin(user.login);
  };
  const saveNewUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/editUser`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          id: user._id,
          login: login,
          name: newname,
          lastName: lastName,
          email: email,
          accesGroup: user.accesGroup,
        },
      }),
    });
    if(response.ok){
        const newuser=await response.json();
        setUser(prev=>({...prev,...newuser}));
        setCurrentUser(prev=>({...prev,...newuser}));
        
       
    }
    setEdition(!edition);
    setNewname(user.name);
    setLastName(user.lastName);
    setEmail(user.email);
    setLogin(user.login);
  };
  const fetchData = async () => {
    const response = await fetch(`${backendUrl}/currentUser`, {
      method: "GET",
      credentials: "include"
    });
    if (response.ok) {
      const user = await response.json();
      setUser(prev=> ({ ...prev, ...user }));
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="edit-user">
      <form action="">
          <fieldset className="panel">
        <div>
          <label htmlFor="">name:</label>

          {edition ? (
            <input type="text" onChange={handleName} value={newname} />
          ) : (<strong>{user.name}</strong>
           
          )}
        </div>
        <div>
          <label htmlFor="">lastname</label>

          {edition ? (
            <input type="text" onChange={handleLastName} value={lastName} />
          ) : (
            user.lastName
          )}
        </div>
        <div>
          <label htmlFor="">email:</label>

          {edition ? (
            <input type="text" onChange={handleEmail} value={email} />
          ) : (
            user.email
          )}
        </div>
        <div>
          <label htmlFor="">login:</label>

          {edition ? (
            <input type="text" onChange={handleLogin} value={login} />
          ) : (
            user.login
          )}
          
        </div>
        <div>
          <button onClick={editNewUser}>edit</button>{" "}
          <button onClick={saveNewUser}>save</button>
        </div>
        </fieldset>
      </form>
      
    </div>
  );
}
export default EditUser;
