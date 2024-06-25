import React, { useEffect } from "react";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/CreateProduct";
import OrdersList from "../components/OrdersList";
import UsersList from "../components/UsersList";
import { Navigate } from "react-router-dom";
import { loadCookie, updateCookie } from "../app/utils";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useAtom(userAtom);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const navigate = useNavigate();
  // Check admin status : corrige  un cookie modifié manuellement
  const handleResponse = (response) => {
    updateCookie(response.user.admin, "isAdmin");
    setUser(loadCookie());
    if (!checkAdmin) {setCheckAdmin(true)};
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

  if (user.isAdmin) {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <h2>Bienvenue, {user.email}!</h2>
        <h3>Liste des utilisateurs</h3>
        <UsersList />
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
