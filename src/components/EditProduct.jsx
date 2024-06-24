import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { buildRequestOptions } from '../app/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { url, options } = buildRequestOptions('products', 'show', { id });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Convertir la price en number
        data.price = Number(data.price);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = (updatedProduct) => {
    navigate('/admin'); // Redirige vers le dashboard admin après la mise à jour
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      {product && <ProductForm product={product} onSubmit={handleUpdateProduct} />}
    </div>
  );
};

export default EditProduct;
