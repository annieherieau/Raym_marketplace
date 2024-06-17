import { useEffect, useState } from 'react';
import Product from './Product';
import { buildRequestOptions } from '../app/api';

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { url, options } = buildRequestOptions('products', 'index');
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products && products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
