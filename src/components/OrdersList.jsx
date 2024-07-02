import { useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../app/atoms";
import { useEffect } from "react";
import { buildRequestOptions } from "../app/api";
import { useState } from "react";
import OrderCard from "./OrderCard";

export default function OrdersList() {
  const { token } = useAtomValue(userAtom);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      // requête index des orders
      const { url, options } = buildRequestOptions("orders", "index", {
        token: token,
      });
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => setOrders(response))
        .catch((err) => setError(err));
    }
  }, [token]);

  if (error) {
    return <p>{error}</p>;
  }
  if (orders) {
    return (
      <div>
        <h1>Orders</h1>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} details={false} paid={order.paid}/>
        ))}
      </div>
    );
  }
}
