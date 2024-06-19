import { useEffect, useState } from 'react';
import Product from './Product';
import { buildRequestOptions } from '../app/api';
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { token, isAdmin } = useAtomValue(userAtom);

  useEffect(() => {
    const { url, options } = buildRequestOptions('products', 'index', { token });
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
  }, [token]);

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { url, options } = buildRequestOptions('products', 'update', { id, body: updatedProduct, token });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedProductData = await response.json();
      setProducts(products.map(product => (product.id === id ? updatedProductData : product)));
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product. Please try again later.');
    }
  };

  const handleDeleteProduct = async (id) => {
    const { url, options } = buildRequestOptions('products', 'delete', { id, token });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product. Please try again later.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          onUpdateProduct={isAdmin ? handleUpdateProduct : null}
          onDeleteProduct={isAdmin ? handleDeleteProduct : null}
        />
      ))}
    </div>
  );
};

export default ProductList;
