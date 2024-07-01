import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import "../index.css";
import { useNavigate } from "react-router-dom";
import CartItem from "./ShoppingCart/CartItem";

export default function Cart({
  onRemoveItem = () => {},
  onUpdateItem = () => {},
  isOpen,
  onClose,
}) {
  const { token } = useAtomValue(userAtom);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [cartAmount, setCartAmount] = useState(0);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const { url, options } = buildRequestOptions("cart", "cart", {
      token: token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Cart not fetched");
      }
      const data = await response.json();
      // console.log("Cart fetched:", data);
      setCartItems(data.items);
      setCartAmount(data.amount);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
      setError(
        "Erreur lors de la récupération du panier. Veuillez réessayer plus tard."
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const handleActionComplete = () => {
    fetchCart();
  };

  const handleResponse = (response, action) => {
    if (action == "validate") {
      navigate(`/order/${response.order.id}`);
    }
  };
  const handleUpdateCart = (event) => {
    const action = event.target.id;
    const { url, options } = buildRequestOptions("cart", "cart_update", {
      token: token,
      body: { cart: { action: action } },
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response, action))
      .catch((err) =>
        setError(`Error occured. Veuillez réessayer plus tard. ${err}`)
      );
    setCartItems([]);
    setCartAmount(0);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-container">
      <h2>Mon panier</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={() => onRemoveItem(item.id)}
            onUpdateQuantity={(quantity) => onUpdateItem(item.id, quantity)}
            onActionComplete={handleActionComplete}
          />
        ))
      ) : (
        <h4>Votre panier est vide.</h4>
      )}
      <div>Total : {cartAmount}</div>
      {cartAmount && (
        <div>
          <button onClick={handleUpdateCart} id="clear">
            Vider le panier
          </button>
          <button onClick={handleUpdateCart} id="validate">
            Valider le panier
          </button>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  onRemoveItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
};
