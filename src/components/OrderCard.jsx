import { Link } from "react-router-dom";
import CartItem from "./ShoppingCart/CartItem";

export default function OrderCard({ order, paid, error, details = true }) {
  if (order) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Commande n° {order.id || order.order.id}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-1">Client: {order.user_email}</p>
        {error && <p className="text-red-500 mb-1">{error}</p>}
        <p className="text-gray-700 dark:text-gray-300 mb-1">Total: {order.amount}</p>
        <p className={`text-sm ${paid ? 'text-green-500' : 'text-yellow-500'} mb-4`}>{paid ? "Payé" : "En attente de paiement"}</p>
        {details &&
          order.items.map((item) => (
            <CartItem key={item.id} item={item} cart={false} />
          ))}
        {!details && (
          <Link to={`/order/${order.id}`} className="text-blue-500 dark:text-blue-300 hover:underline">
            Voir les détails
          </Link>
        )}
      </div>
    );
  }
  return null;
}
