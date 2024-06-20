import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import '../index.css';

const Cart = ({ onRemoveItem = () => {}, onUpdateItem = () => {} }) => {
  const { token } = useAtomValue(userAtom);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [cartAmount, setCartAmount] = useState(0);

  const fetchCart = async () => {
    const { url, options } = buildRequestOptions('cart', 'cart', {
      token: token
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Cart not fetched');
      }
      const data = await response.json();
      console.log('Cart fetched:', data);
      setCartItems(data.items);
      setCartAmount(data.amount);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Error fetching cart. Please try again later.');
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

  const handleUpdateCart = async () => {
    const { url, options } = buildRequestOptions('cart', 'cart_update', {
      token: token,
      body: {cart: {action: event.target.id}}});

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to empty cart');
      }
      // Si la suppression est réussie côté serveur, mettez à jour l'état local
      setCartItems([]);
    } catch (error) {
      console.error('Error emptying cart:', error);
      setError('Error emptying cart. Please try again later.');
    }
    setCartAmount(0);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-container">
      <h2>Mon panier</h2>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
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
      <button onClick={handleUpdateCart} id='clear'>Vider le panier</button>
      <button onClick={handleUpdateCart} id='validate'>Valider le panier</button>
    </div>
  );
};

Cart.propTypes = {
  onRemoveItem: PropTypes.func,
  onUpdateItem: PropTypes.func
};

export default Cart;
