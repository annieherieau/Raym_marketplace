import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { openCartAtom, updateCartAtom, userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import Checkout from "../components/Checkout";
import OrderCard from "../components/OrderCard";
import Step from "../components/Step";

export default function OrderPage() {
  const { orderId } = useParams();
  const { token, isAdmin } = useAtomValue(userAtom);
  const [order, setOrder] = useState(null);
  const [, setOpenCart] = useAtom(openCartAtom);
  const [, setUpdateCart] = useAtom(updateCartAtom);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const [paid, setPaid] = useState(false);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // traitement de la requete d'annulation
  const handleCancelResponse = (response) => {
    setUpdateCart(true);
    setOpenCart(true);
    navigate("/shop");
  };

  // Requête d'annulation de la commande (suppression commande et renvoi des produits dans le panier)
  const handleCancel = () => {
    const { url, options } = buildRequestOptions("orders", "delete", {
      id: orderId,
      token: token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleCancelResponse(response))
      .catch((err) => console.error(err));
  };

  // requête pour créer le checkout Stripe (page de paiement sécurisée)
  const handleCheckout = () => {
    const { url, options } = buildRequestOptions(
      "checkout",
      "checkout_create",
      {
        body: {
          order_id: orderId,
        },
        token: token,
      }
    );
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        window.location.replace(response.url);
      })
      .catch((err) => console.error(err));
  };

  const handleResponse = (response) => {
    if (response.error) {
      setError(response.error);
    } else {
      setOrder(response);
      setPaid(response.paid);
    }
  };

  const fetchOrder = async () => {
    const { url, options } = buildRequestOptions("orders", "show", {
      id: orderId,
      token: token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
      if (action === "success") {
        const session_id = searchParams.get("session_id");
        const { url, options } = buildRequestOptions(null, "checkout_success", {
          id: session_id,
          token: token,
        });
        fetch(url, options)
          .then((response) => response.json())
          .then(() => setPaid(true))
          .catch((err) => console.error(err));
      }
    }
  }, [token]);

  if (error) return <p>{error}</p>;

  if (order) {
    return (
      <div className={`flex mt-8 mr-8 ml-8 rounded-[20px] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <div className="w-2/4">
          <Step />
        </div>
        <div className="w-2/4 mr-10 mt-20">
          <OrderCard
            order={order}
            paid={paid}
            error={error}
          />
          {!paid && !isAdmin && (
            <div className="flex justify-end mb-20">
              <button onClick={handleCancel} className="hover:text-gray-500">Retourner à la boutique</button>
              <button
                onClick={handleCheckout}
                className={`ml-10 py-4 px-20 rounded-lg font-bold ${isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-palegreen-500 hover:bg-palegreen-600 text-black'}`}
              >
                Payer
              </button>
            </div>
          )}
          <Checkout action={action} />
        </div>
      </div>
    );
  }

  return null;
}
