/* eslint-disable react-hooks/exhaustive-deps */
import "../src/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Registrieren from "./components/registriren/Registrieren";
import Nav from "./components/header/Nav";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Solicitude from './components/solicitude/Solicitude';
import MyProvider from "./components/context/AppContext";
import UserLogged from "./components/userLogged/userLogged";
import ChangePassword from "./components/changePassword/ChangePassword";
import EditUser from "./components/editUser/EditUser";



function App() {
  return (
    <div className="App">
      <MyProvider>
        <div className="header">
          <Nav />          
          <UserLogged />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/solicitude" element={<Solicitude />} />
          <Route path="/registrieren" element={<Registrieren />} />
          <Route path="/users" element={<Users />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </MyProvider>
    </div>
  );
}

export default App;
