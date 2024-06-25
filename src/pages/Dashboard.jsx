// src/pages/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/CreateProduct";
import OrdersList from "../components/OrdersList";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false && isLoggedIn && user.token) {
      const fetchUsers = async () => {
        if (!user.isAdmin) {
          setError("Unauthorized: Must be an Admin user.");
          return;
        }

        const { url, options } = buildRequestOptions(
          "users",
          "admin_dashboard",
          {
            token: user.token,
          }
        );

        console.log("Fetching users with options:", options);

        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (response.ok) {
            setUsers(data.data);
          } else {
            setError(`Failed to fetch users: ${data.status.message}`);
            console.error("Failed to fetch users", data);
          }
        } catch (error) {
          setError("Error fetching users");
          console.error("Error fetching users", error);
        }
      };

      fetchUsers();
      effectRan.current = true;
    }

    return () => {
      effectRan.current = false;
    };
  }, [isLoggedIn, user.token, user.isAdmin]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!Array.isArray(users)) {
    return <div className="text-red-500">Unexpected response format</div>;
  }

  if (user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-4">Bienvenue, {user.email}!</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Liste des utilisateurs</h3>
          <ul className="list-disc list-inside bg-white p-4 rounded shadow">
            {users.map((user) => (
              <li key={user.id} className="mb-1">{user.email}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Liste des Produits</h3>
          <div className="bg-white p-4 rounded shadow">
            <ProductList />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Créer un nouveau Produit</h3>
          <div className="bg-white p-4 rounded shadow">
            <CreateProduct />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Liste des commandes</h3>
          <div className="bg-white p-4 rounded shadow">
            <OrdersList />
          </div>
        </div>
      </div>
    );
  } 
}
