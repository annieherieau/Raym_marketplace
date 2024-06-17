// src/components/Cart.jsx
import { useCart } from '../components/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { state } = useCart();

  return (
    <div>
      <h2>Mon panier</h2>
      {state.items.length > 0 ? (
        state.items.map(item => <CartItem key={item.id} item={item} />)
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Cart;
