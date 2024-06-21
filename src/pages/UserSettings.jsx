import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../app/atoms";
import { useState } from "react";
import { buildRequestOptions } from "../app/api";
import { useEffect } from "react";
import UserInfos from "../components/UserInfos";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const [current_user] = useAtom(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
  const [error, setError] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [updateUser, setUpdateUser] = useState(false);
  const [requestOptions, setRequestOptions] = useState(undefined);

  useEffect(() => {
    // créer les options de la requeste
    if (current_user.token) {
      setRequestOptions(
        buildRequestOptions("users", "profile", {
          token: current_user.token,
        })
      );
    }
  }, [current_user]);

  function handleResponse(response) {
    if (response.status.code == 200) {
      setUserData(response.user);
    } else {
      setError(`${response.status.code} : ${response.status.message}`);
    }
  }
  useEffect(() => {
    if (requestOptions) {
      fetch(requestOptions.url, requestOptions.options)
        .then((response) => response.json())
        .then((response) => handleResponse(response))
        .catch((err) => console.error(err));
    }
  }, [requestOptions, updateUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); // Redirige vers homepage si pas connecté
    }
  }, [isLoggedIn]);

  if (userData) {
    return (
      <section>
        <h1>Mes informations</h1>
        {!updateUser && (
          <div>
            <UserInfos user={userData} />
            <button
              onClick={() => {
                setUpdateUser((updateUser) => !updateUser);
              }}
            >
              Modifier mes informations
            </button>
          </div>
        )}
        {updateUser && (
          <UserForm user={userData} onUpdate={() => setUpdateUser(false)} />
        )}
      </section>
    );
  } else if (isLoggedIn) {
    return (
      <section>
        <h1>Mes informations</h1>
        {error && <p>{error}</p>}
      </section>
    );
  }
}
