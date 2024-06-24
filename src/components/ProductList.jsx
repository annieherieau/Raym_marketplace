import React, { useState, useEffect } from "react";
import Product from "./Product";
import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";

const ProductList = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Nouvel état pour le statut d'administrateur
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:3000/admin_check", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Utiliser le token de l'utilisateur
          },
        });

        if (!response.ok) {
          throw new Error("Failed to check admin status");
        }

        const data = await response.json();
        setIsAdmin(data.admin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

  useEffect(() => {
    const { url, options } = buildRequestOptions("products", "index", {
      token: user.token,
    });
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      });
  }, [user.token]);

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { url, options } = buildRequestOptions("products", "update", {
      id,
      body: updatedProduct,
      token: user.token,
    });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedProductData = await response.json();
      setProducts(
        products.map((product) =>
          product.id === id ? updatedProductData : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again later.");
    }
  };

  const handleDeleteProduct = async (id) => {
    const { url, options } = buildRequestOptions("products", "delete", {
      id,
      token: user.token,
    });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant la vérification du statut admin
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          onUpdateProduct={isAdmin ? handleUpdateProduct : null}
          onDeleteProduct={isAdmin ? handleDeleteProduct : null}
        />
      ))}
    </div>
  );
};

export default ProductList;
