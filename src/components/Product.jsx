import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { buildRequestOptions } from "../app/api";

const Product = ({ product, onUpdateProduct, onDeleteProduct }) => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // Nouvel état pour le statut d'administrateur
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:3000/admin_check', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` // Utiliser le token de l'utilisateur
          }
        });

        if (!response.ok) {
          throw new Error('Failed to check admin status');
        }

        const data = await response.json();
        setIsAdmin(data.admin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

  const handleAddToCart = () => {
    console.log(product);

    const { url, options } = buildRequestOptions('cart_items', 'create', {
      body: { product_id: product.id, quantity: 1 },
      token: user.token
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

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant la vérification du statut admin
  }

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
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default Product;
