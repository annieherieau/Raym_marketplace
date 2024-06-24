import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import { redirectTo } from "../app/utils";
import Checkout from "../components/Checkout";
import { useSearchParams } from "react-router-dom";
import OrderCard from "../components/OrderCard";

export default function OrderPage() {
  const { orderId } = useParams();
  const { token, isAdmin } = useAtomValue(userAtom);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  // Requête d'annulation de le commande (suppression commande et renvoi des produits dans le panier)
  const handleCancel = (e) => {
    const { url, options } = buildRequestOptions("orders", "delete", {
      id: orderId,
      token: token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        redirectTo("/cart");
      })
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
    }
  };
  useEffect(() => {
    if (token) {
      // requête d'affichage de la commande (order)
      const { url, options } = buildRequestOptions("orders", "show", {
        id: orderId,
        token: token,
      });
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => handleResponse(response))
        .catch((err) => setError(err));

      // requête checkout : si success => passer order en paid=true
      if (action == "success") {
        const session_id = searchParams.get("session_id");
        const { url, options } = buildRequestOptions(null, "checkout_success", {
          id: session_id,
          token: token,
        });
        fetch(url, options)
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      }
    }
  }, [token]);

  if (error) return <p>{error}</p>;

  if (order) {
    return (
      <div>
        <OrderCard order={order} error={error} />
        {!order.paid && !isAdmin && (
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
