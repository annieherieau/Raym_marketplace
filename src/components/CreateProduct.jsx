import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleCreateProduct = (newProduct) => {
    navigate('/admin'); // Redirige vers la liste des produits après la création
  };

  return (
    <div>
      <h2>Create Product</h2>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
};

export default CreateProduct;
