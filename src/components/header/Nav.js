import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {AppContext} from "../context/AppContext";

function Nav() {
  const [currentUser] = useContext(AppContext);
  return (
    <header className="nav">
      <div>
        <ul className="nav--ul">
          <li>
            <NavLink className="nav--link" to="/">
              Home
            </NavLink>
          </li>
            {currentUser.accesGroup === "gast" && (
              <>
            <li>
              <NavLink className="nav--link" to="/login">
                Login
              </NavLink>
            </li>
            <li>
            <NavLink className="nav--link" to="/registrieren">
              Registrieren
            </NavLink>
          </li>
          </>
          )}
          {currentUser.accesGroup ==="admin" && (
              <>
            <li>
              <NavLink className="nav--link" to="/users">
                Users
              </NavLink>
            </li>
            <li>
            <NavLink className="nav--link" to="/solicitude">
              Solicitude
            </NavLink>
          </li>
          </>
          )}
          {currentUser.accesGroup === "member" && (
              <>
            <li>
              <NavLink className="nav--link" to="/edituser">
                EditUser
              </NavLink>
            </li>
            <li>
            <NavLink className="nav--link" to="/changepassword">
              ChangePassword
            </NavLink>
          </li>
          </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Nav;
