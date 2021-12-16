import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

function Solicitude() {
  const [notApprovedUsers, setNotApprovedUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3011/notApprovedUser`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setNotApprovedUsers([...data]);
    console.log(data);
  };

  const acceptUser = async (login) => {
    await fetch(`http://localhost:3011/acceptUser`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          login: login,
        },
      }),
    });
    fetchData();
  };

  const deleteUser = async (login) => {
    await fetch(`http://localhost:3011/deleteUser`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          login: login,
        },
      }),
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="solicitude">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>lastname</th>
            <th>username</th>
            <th>email</th>
            <th>accept</th>
            <th>cancel</th>
          </tr>
        </thead>
        <tbody>
          {notApprovedUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td> {user.lastName}</td>
                <td>{user.login}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => acceptUser(user.login)}
                  >
                    accept
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.login)}
                  >
                    cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Solicitude;
