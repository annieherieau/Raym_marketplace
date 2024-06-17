// src/components/CartItem.jsx
import PropTypes from 'prop-types';
import { useCart } from '../components/CartContext';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemove = () => {
    fetch(`/cart_items/${item.id}`, { method: 'DELETE' })
      .then(() => dispatch({ type: 'REMOVE_ITEM', payload: item }));
  };

  const handleChangeQuantity = (quantity) => {
    fetch(`/cart_items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_item: { quantity } }),
    })
      .then(response => response.json())
      .then(data => dispatch({ type: 'UPDATE_ITEM', payload: data }));
  };

  return (
    <div>
      <h3>{item.product.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => handleChangeQuantity(item.quantity - 1)}>-</button>
      <button onClick={() => handleChangeQuantity(item.quantity + 1)}>+</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;