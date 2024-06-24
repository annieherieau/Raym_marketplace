import React, { useEffect, useState, useRef } from "react";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/CreateProduct";
import OrdersList from "../components/OrdersList";

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);
  if (!Array.isArray(users)) {
    setError("Unexpected response format");
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user.isAdmin) {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <h2>Bienvenue, {user.email}!</h2>
        <h3>Liste des utilisateurs</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
        <h3>Liste des Produits</h3>
        <ProductList />
        <h3>Créer un nouveau Produit</h3>
        <CreateProduct />
        <h3>Liste des commandes</h3>
        <OrdersList />
      </div>
    );
  }
}
