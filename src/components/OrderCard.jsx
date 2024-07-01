import { Link } from "react-router-dom";
import CartItem from "./ShoppingCart/CartItem";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";

export default function OrderCard({ order, paid, error, details = true }) {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const user = useAtomValue(userAtom);

  if (order) {
    return (
      <div className={`shadow-md rounded-lg p-6 mb-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h1 className="text-xl font-bold mb-2">
          Commande n° {order.id || order.order.id}
        </h1>
        {user.admin && (<p className="mb-1">
         Client: {order.user_email}
        </p>)}
        {error && <p className="text-red-500 mb-1">{error}</p>}
        <p className="mb-1">
          Total: {order.amount}€
        </p>
        <p className={`text-sm mb-4 ${paid ? 'text-green-500' : 'text-yellow-500'}`}>
          {paid ? "Payé" : "En attente de paiement"}
        </p>
        {details &&
          order.items.map((item) => (
            <CartItem key={item.id} item={item} cart={false} />
          ))}
        {!details && (
          <Link to={`/order/${order.id}`} className={`${isDarkMode ? 'text-blue-300' : 'text-blue-500'} hover:underline`}>
            Voir les détails
          </Link>
        )}
      </div>
    );
  }
  return null;
}
