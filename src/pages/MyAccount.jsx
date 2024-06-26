import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../app/atoms";
import { useState, useEffect } from "react";
import { buildRequestOptions } from "../app/api";
import UserInfos from "../components/UserInfos";
import UserForm from "../components/UserForm";
import OrdersList from "../components/OrdersList";
import { Navigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';

export default function MyAccount() {
  const [current_user] = useAtom(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [error, setError] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [updateUser, setUpdateUser] = useState(false);
  const [requestOptions, setRequestOptions] = useState(undefined);
  const [activeTab, setActiveTab] = useState('profile');

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
    if (response.status.code === 200) {
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Mon Compte</h1>
          </div>
          <nav className="mt-6">
            <ul>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'profile' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profil
              </li>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Commandes
              </li>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'edit' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                Modifier mes informations
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {userData && activeTab === 'profile' && (
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">Mes informations</h1>
              {!updateUser && (
                <div>
                  <UserInfos user={userData} />
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setActiveTab('edit')}
                  >
                    Modifier mes informations
                  </button>
                </div>
              )}
            </section>
          )}

          {userData && activeTab === 'edit' && (
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">Modifier mes informations</h1>
              <UserForm user={userData} onUpdate={() => setActiveTab('profile')} />
            </section>
          )}

          {userData && activeTab === 'orders' && !current_user.isAdmin && (
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">Mes Commandes</h1>
              <OrdersList />
            </section>
          )}

          {!userData && isLoggedIn && (
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-4">Mes informations</h1>
              {error && <p className="text-red-500">{error}</p>}
              <OrdersList />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
