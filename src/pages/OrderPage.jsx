import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import CartItem from "../components/CartItem";

export default function OrderPage() {
  const { orderId } = useParams();
  const { token } = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [order, setOrder] = useState(null);
  const [orderAmount, setOrderAmount] = useState(0);
  const [error, setError] = useState(null);

  const handleResponse = (response) => {
    setOrder(response.items);
    setOrderAmount(response.amount);
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

  console.log(order);
  if (error) return <p>{error}</p>;

  if (order) {
    return (
      <div>
        <h1>Commande n° {orderId}</h1>
        {/* <p>Total {order.amount}</p> */}
        {order.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            cart={false}
          />
        ))}
      </div>
    );
  }
}
