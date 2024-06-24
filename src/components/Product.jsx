import React from "react";
import PropTypes from "prop-types";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, isAuthAtom, updateCartAtom } from "../app/atoms";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { buildRequestOptions } from "../app/api";

const Product = ({ product, isAdmin, onUpdateProduct, onDeleteProduct }) => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate();
  const [, setUpdateCart] = useAtom(updateCartAtom);

  const handleAddToCart = () => {
    const { url, options } = buildRequestOptions("cart_items", "create", {
      body: { product_id: product.id, quantity: 1 },
      token: user.token,
    });
    fetch(url, options)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Item not added to cart");
        }
        return response.json();
      })
      // .then(data => dispatch({ type: 'ADD_ITEM', payload: data }))
      .catch((error) => console.error("Error:", error));
    setUpdateCart(true);
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
        <img
          src={product.photo_url}
          alt={product.name}
          style={{ width: "100px", height: "100px" }}
        />
      )}
      {isLoggedIn && !isAdmin && (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
      <Link to={`/product/${product.id}`}>View Details</Link>
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
  isAdmin: PropTypes.bool.isRequired, // Ajout de la prop isAdmin
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default Product;
