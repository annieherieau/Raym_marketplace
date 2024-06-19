import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buildRequestOptions } from '../app/api';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      {product.photo_url && <img src={product.photo_url} alt={product.name} style={{ width: '300px', height: '300px' }} />}
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductPage;
