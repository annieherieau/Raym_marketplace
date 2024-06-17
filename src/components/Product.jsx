// src/components/Product.jsx
import { useCart } from '../contexts/CartContext';

const Product = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    fetch('/cart_items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id }),
    })
      .then(response => response.json())
      .then(data => dispatch({ type: 'ADD_ITEM', payload: data }));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
