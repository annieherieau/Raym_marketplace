import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { openCartAtom, updateCartAtom, userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import Checkout from "../components/Checkout";
import { useSearchParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";
import { useNavigate } from "react-router-dom";

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

  // traitement de la requete d'annulation
  const handleCancelResponse = (response) => {
    console.log(response);
    setUpdateCart(true);
    setOpenCart(true);
    navigate("/my_account");
  };
  // Requête d'annulation de la commande (suppression commande et renvoi des produits dans le panier)
  const handleCancel = (e) => {
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
  const handleCheckout = (e) => {
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
      // console.log(response);
      setOrder(response);
      setPaid(response.paid)
    }
  };

  const fetchOrder = async () => {
    // requête d'affichage de la commande (order)
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
      if (action == "success") {
        const session_id = searchParams.get("session_id");
        const { url, options } = buildRequestOptions(null, "checkout_success", {
          id: session_id,
          token: token,
        });
        fetch(url, options)
          .then((response) => response.json())
          .then((response) => setPaid(true))
          .catch((err) => console.error(err));
      }
    }
  }, [token]);

  if (error) return <p>{error}</p>;

  if (order) {
    return (
      <div>
        <OrderCard
          order={order}
          paid={paid}
          error={error}
        />
        {!paid && !isAdmin && (
          <div>
            <button onClick={handleCancel}>Annuler</button>
            <button onClick={handleCheckout}>Payer</button>
          </div>
        )}
        <Checkout action={action} />
      </div>
    );
  }
}
