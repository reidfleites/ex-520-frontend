import React from "react";
import { NavLink } from "react-router-dom";

function NavAdmin() {
  return (
    <header className="nav">
      <div>
        <ul className="nav-ul">
          <li>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/solicitude">
              Solicitude
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavAdmin;
