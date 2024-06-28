import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import { loadCookie, updateCookie } from "../app/utils";
import { useNavigate, Navigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/CreateProduct";
import OrdersList from "../components/OrdersList";
import UsersList from "../components/UsersList";
import 'tailwindcss/tailwind.css';

export default function Dashboard() {
  const [user, setUser] = useAtom(userAtom);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  // Check admin status : corrige un cookie modifié manuellement
  const handleResponse = (response) => {
    updateCookie(response.user.admin, "isAdmin");
    setUser(loadCookie());
    if (!checkAdmin) {
      setCheckAdmin(true);
    }
    if (!response.user.admin) {
      navigate("/");
    }
  };

  useEffect(() => {
    const { url, options } = buildRequestOptions(null, "profile", {
      token: user.token,
    });

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((err) => console.error(err));
  }, [checkAdmin]);

  if (!checkAdmin) {
    return null; // Affichez un spinner ou un message de chargement ici si nécessaire
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-black text-white rounded-lg ml-2 mr-2 mt-6 mb-6">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-palegreen-500">Dashboard Admin</h1>
            <p>Bienvenue {user.email}</p>
          </div>
          <nav className="mt-6">
            <ul>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Liste des utilisateurs
              </li>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'products' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                Liste des Produits
              </li>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'create-product' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('create-product')}
              >
                Créer un nouveau Produit
              </li>
              <li
                className={`p-4 cursor-pointer hover:bg-gray-700 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Liste des commandes
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'users' && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-5xl font-semibold mb-4 text-palegreen-500 text-center" style={{fontFamily: 'Chakra petch'}}>Liste des utilisateurs</h1>
              <UsersList />
            </section>
          )}
          {activeTab === 'products' && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-5xl font-semibold mb-4 text-palegreen-500 text-center" style={{fontFamily: 'Chakra petch'}}>Liste des Produits</h1>
              <ProductList />
            </section>
          )}
          {activeTab === 'create-product' && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <CreateProduct />
            </section>
          )}
          {activeTab === 'orders' && (
            <section className="bg-black p-6 rounded-lg shadow-md md:w-5/6 mx-auto">
              <h1 className="text-5xl font-semibold mb-4 text-palegreen-500 text-center" style={{fontFamily: 'Chakra petch'}}>Liste des commandes</h1>
              <OrdersList />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
