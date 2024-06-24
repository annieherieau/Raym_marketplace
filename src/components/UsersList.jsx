import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import { useState } from "react";
import { useEffect } from "react";

export default function UsersList() {
  const user = useAtomValue(userAtom);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { url, options } = buildRequestOptions("users", "admin_dashboard", {
      token: user.token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setUsers(response.data))
      .catch((err) => setError(err));
  }, [user]);

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
