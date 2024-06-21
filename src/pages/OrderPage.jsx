import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import CartItem from "../components/CartItem";
import { redirectTo } from "../app/utils";
import Checkout from "../components/Checkout";
import { useSearchParams } from "react-router-dom";

export default function OrderPage() {
  const { orderId } = useParams();
  const { token } = useAtomValue(userAtom);
  const [order, setOrder] = useState(null);
  const [orderAmount, setOrderAmount] = useState(0);
  const [error, setError] = useState(null);
  const [serchParams] = useSearchParams();
  const action = serchParams.get("action");

  const handleResponse = (response) => {
    setOrder(response.items);
    setOrderAmount(response.amount);
  };

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

  useEffect(() => {
    if (token) {
      const { url, options } = buildRequestOptions("orders", "show", {
        id: orderId,
        token: token,
      });
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => handleResponse(response))
        .catch((err) => setError(err));
    }
  }, [token]);

  if (error) return <p>{error}</p>;

  if (order) {
    return (
      <div>
        <h1>Commande n° {orderId}</h1>
        <p>{error ? error : ""}</p>
        <p>Total {orderAmount}</p>
        {order.map((item) => (
          <CartItem key={item.id} item={item} cart={false} />
        ))}
        {action !='success' && (<div>
          <button onClick={handleCancel}>Annuler</button>
          <button onClick={handleCheckout}>Payer</button>
        </div>)}
        <Checkout action={action} />
      </div>
    );
  }
}
