/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import NotAprovedUser from "../notAprovedUsers/NotAprovedUser";

import { AppContext } from "../context/AppContext";


function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [currentUser, setCurrentUser] = useContext(AppContext);

  const handleLogin = (e) => {
    const fLogin = e.target.value;
    setLogin(fLogin);
  };
  const handlePassword = (e) => {
    const fPassword = e.target.value;
    setPassword(fPassword);
  };

  const clearForm = () => {
    setLogin("");
    setPassword("");
  };
  const handleButton = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          login: login,
          password: password,
        },
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setCurrentUser((prev) => ({ ...prev,...data }));
    } else {
      setMessage(data.message);
    }
    clearForm();
  };
 
  const getCurrentUser = async () => {
    const response = await fetch(`${backendUrl}/currentUser`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setCurrentUser((prev) => ({ ...prev, ...data }));
    console.log(data);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  //////////////////////////////////////////////////////////////////
  return (
    <div className="login">
      {currentUser.accesGroup === "gast" && (
        <form action="">
          <div className="mb-3">
            <label htmlFor="login" className="form-label">
              user:
            </label>
            <input
              type="text"
              className="form-control"
              value={login}
              onChange={handleLogin}
              id="login"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              password:
            </label>
            <input
              type="text"
              className="form-control"
              value={password}
              onChange={handlePassword}
              id="password"
            />
          </div>

          <button className="btn btn-primary" onClick={handleButton}>
            login
          </button>
          <div className="form-text">{message}</div>
        </form>
      )}

      {currentUser.accesGroup === "notApprovedUser" && <NotAprovedUser />}
      {currentUser.accesGroup === "member"}
     
    </div>
  );
}
export default Login;
