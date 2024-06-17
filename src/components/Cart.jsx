// src/components/Cart.jsx
import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { state, dispatch } = useCart();

  useEffect(() => {
    fetch('/cart')
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_CART', payload: data }));
  }, [dispatch]);

  return (
    <div>
      <h2>Your Cart</h2>
      {state.items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Cart;
