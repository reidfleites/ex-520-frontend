import { useState ,useEffect} from "react";


function Solicitude() {
  const [notApprovedUsers, setNotApprovedUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notApprovedUser`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    setNotApprovedUsers([...data]);
    console.log(data);
  };

  const acceptUser = async (login) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/acceptUser`, {
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
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteUser`, {
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
