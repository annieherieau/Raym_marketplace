import { Link } from "react-router-dom";
import CartItem from "./CartItem";

export default function OrderCard({ order, error, details = true }) {
  if (order) {
    return (
      <div>
        <h1>Commande n° {order.id || order.order.id}</h1>
        <p>Client: {order.user_email}</p>
        <p>{error ? error : ""}</p>
        <p>Total: {order.amount}</p>
        <p>{order.paid ? "Payé" : "En attente de paiement"}</p>
        {details &&
          order.items.map((item) => (
            <CartItem key={item.id} item={item} cart={false} />
          ))}
        {!details &&(<Link to={`/order/${order.id}`}>Voir les détails</Link>)}
      </div>
    );
  }
}
