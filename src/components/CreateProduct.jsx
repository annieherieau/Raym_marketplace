// src/components/CreateProduct.jsx
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleCreateProduct = (newProduct) => {
    navigate('/admin'); // Redirige vers la liste des produits après la création
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <div className="bg-white p-6 rounded shadow">
        <ProductForm onSubmit={handleCreateProduct} />
      </div>
    </div>
  );
};

export default CreateProduct;
