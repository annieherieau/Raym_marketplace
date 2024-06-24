import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import { useState } from "react";
import { useEffect } from "react";

export default function UsersList() {
  const {token} = useAtomValue(userAtom);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleResponse =(response)=>{
    if(response.data){
      setUsers(response.data)
    }else{
      setError(response.status.message)
    }
  }
  useEffect(() => {
    if(token){const { url, options } = buildRequestOptions("users", "admin_dashboard", {
      token: token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((err) => setError(err));}
  }, [token]);

  if (!Array.isArray(users)) {
    setError("Unexpected response format");
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if(Array.isArray(users) && users.length >0)
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}
