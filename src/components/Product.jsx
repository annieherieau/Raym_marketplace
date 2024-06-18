import { useCart } from '../components/CartContext';
import PropTypes from 'prop-types';
import { buildRequestOptions } from '../app/api';

const Product = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    const { url, options } = buildRequestOptions('cart_items', 'create', {
      body: JSON.stringify({ product_id: product.id, quantity: 1 }),
    });

    fetch(url, options)
      .then(response => response.json())
      .then(data => dispatch({ type: 'ADD_ITEM', payload: data }));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      {/* <p>${parseFloat(product.price).toFixed(2)}</p> */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    // price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;