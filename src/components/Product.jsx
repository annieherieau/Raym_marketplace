import PropTypes from 'prop-types';
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import { useNavigate } from 'react-router-dom';

const Product = ({ product, onUpdateProduct, onDeleteProduct }) => {
  const { token, isAdmin } = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log(product);

    const { url, options } = buildRequestOptions('cart_items', 'create', {
      body: { product_id: product.id, quantity: 1 },
      token: token
    });
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

  const handleUpdateClick = () => {
    navigate(`/products/${product.id}/edit`); // Navigue vers la page d'édition
  };

  const handleDeleteClick = () => {
    onDeleteProduct(product.id);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      {product.photo_url && (
        <img src={product.photo_url} alt={product.name} style={{ width: '100px', height: '100px' }} />
      )}
      {isLoggedIn && !isAdmin && (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
      {isAdmin && (
        <div>
          <button onClick={handleUpdateClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string, // Ajout de la prop photo_url
  }).isRequired,
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default Product;
