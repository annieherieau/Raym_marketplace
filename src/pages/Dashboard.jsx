import React, { useEffect, useState, useRef } from "react";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import ProductList from "../components/ProductList";
import CreateProduct from "../components/CreateProduct";
import OrdersList from "../components/OrdersList";
import UsersList from "../components/UsersList";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const user = useAtomValue(userAtom);

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
  } else {
    return <Navigate to={"/"} />;
  }
}
