import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../app/atoms";
import { useState, useEffect } from "react";
import { buildRequestOptions } from "../app/api";
import UserInfos from "../components/UserInfos";
import UserForm from "../components/UserForm";
import OrdersList from "../components/OrdersList";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { removeCookie } from "../app/utils";

export default function MyAccount() {
  const [current_user, setCurrentUser] = useAtom(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [error, setError] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [updateUser, setUpdateUser] = useState(false);
  const [requestOptions, setRequestOptions] = useState(undefined);
  const [activeTab, setActiveTab] = useState('profile');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteAccount = async () => {
    const { url, options } = buildRequestOptions('users', 'delete', { id: current_user.id, token: current_user.token });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setCurrentUser(false); // Réinitialiser l'état de l'utilisateur après suppression
      removeCookie();
      navigate('/'); // Rediriger vers la page d'accueil ou de connexion
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete account');
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-black text-white rounded-lg ml-2 mr-2 mt-6 mb-6">
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

        <main className="flex-1 p-6">
          {userData && activeTab === 'profile' && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-5xl font-semibold mb-4 text-palegreen-500 text-center" style={{ fontFamily: 'Chakra petch' }}>
                Mes informations
              </h1>
              {!updateUser && (
                <div>
                  <UserInfos user={userData} />
                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => setActiveTab('edit')}
                    >
                      Modifier mes informations
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                      onClick={() =>
                        openModal(
                          'Suppression du compte',
                          <div className="text-white">
                            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                            <div className="flex justify-center mt-4 space-x-6">
                              <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
                              >
                                Oui
                              </button>
                              <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                              >
                                Non
                              </button>
                            </div>
                          </div>
                        )
                      }
                    >
                      Supprimer mon compte
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {userData && activeTab === 'edit' && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-5xl font-semibold mb-4 text-palegreen-500 text-center" style={{ fontFamily: 'Chakra petch' }}>
                Modifier mes informations
              </h1>
              <UserForm user={userData} onUpdate={() => setActiveTab('profile')} />
            </section>
          )}

          {userData && activeTab === 'orders' && !current_user.isAdmin && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-5xl font-semibold mb-4 text-palegreen-500 text-center" style={{ fontFamily: 'Chakra petch' }}>
                Mes Commandes
              </h1>
              <OrdersList />
            </section>
          )}

          {!userData && isLoggedIn && (
            <section className="bg-white p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-2xl font-semibold mb-4 text-center" style={{ fontFamily: 'Chakra petch' }}>Mes informations</h1>
              {error && <p className="text-red-500">{error}</p>}
              <OrdersList />
            </section>
          )}

          <Modal show={showModal} onClose={closeModal} title={modalTitle}>
            {modalContent}
          </Modal>
        </main>
      </div>
    </div>
  );
}
