import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { buildRequestOptions } from '../app/api';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (!user || !user.token) {
      console.error("Token is not available");
      return;
    }

    const fetchCategories = async () => {
      const { url, options } = buildRequestOptions('categories', 'index', { token: user.token });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchColors = async () => {
      const { url, options } = buildRequestOptions('colors', 'index', { token: user.token });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchCategories();
    fetchColors();
  }, [user]);

  const handleCreateProduct = (newProduct) => {
    navigate('/admin'); // Redirige vers la liste des produits après la création
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded shadow">
        <ProductForm categories={categories} colors={colors} onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
};

export default CreateProduct;
