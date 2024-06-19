// import { useCart } from '../components/CartContext';
import PropTypes from 'prop-types';
import { buildRequestOptions } from '../app/api';
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";

const Product = ({ product }) => {
  // const { dispatch } = useCart();
  const { token } = useAtomValue(userAtom);

  const handleAddToCart = () => {
    console.log(product);

    const { url, options } = buildRequestOptions('cart_items', 'create', 
      {
      body: { product_id: product.id, quantity: 1 },
      token: token
    }
    );
    console.log(url, options);
    fetch(url, options)
      .then(response => {
        console.log(response);
        if (response.status !== 201) {
          throw new Error('Item not added to cart');
        }
        return response.json();
      })
      // .then(data => dispatch({ type: 'ADD_ITEM', payload: data }))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
