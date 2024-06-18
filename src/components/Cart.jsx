// src/components/Cart.jsx
import { useCart } from '../components/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { state } = useCart();

  return (
    <div>
      <h2>Mon panier</h2>
      {state.items.length > 0 ? (
        state.items.map(product => <CartItem key={product.id} item={product.name} />)
      ) : (
        <p>Votre panier est vide.</p>
      )}
    </div>
  );
};

export default Cart;
