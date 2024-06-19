import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom, isAuthAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import Comments from '../components/Comments';

const ProductPage = () => {
  const { productId } = useParams();
  const { token } = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { url, options } = buildRequestOptions('products', 'show', { id: productId });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { url, options } = buildRequestOptions(null, 'current_user', { token });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch current user');
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUser();
    }
  }, [isLoggedIn, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      {product.photo_url && <img src={product.photo_url} alt={product.name} style={{ width: '300px', height: '300px' }} />}
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Comments productId={productId} isLoggedIn={isLoggedIn} token={token} currentUser={currentUser} />
    </div>
  );
};

export default ProductPage;
