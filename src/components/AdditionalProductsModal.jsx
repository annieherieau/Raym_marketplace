import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { buildRequestOptions } from '../app/api';

const AdditionalProductsModal = ({ open, onClose, onAddToCart }) => {
  const [additionalProducts, setAdditionalProducts] = useState([]);

  useEffect(() => {
    const fetchAdditionalProducts = async () => {
      const { url, options } = buildRequestOptions('products', 'fetch_additional_products');
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch additional products');
        }
        const data = await response.json();
        setAdditionalProducts(data);
      } catch (error) {
        console.error('Error fetching additional products:', error);
      }
    };

    if (open) {
      fetchAdditionalProducts();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Produits Additionnels</h2>
        <button onClick={onClose}>Close</button>
        <ul>
          {additionalProducts.map(product => (
            <li key={product.id}>
              <p>{product.name}</p>
              <button onClick={() => onAddToCart(product)}>Ajouter au panier</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

AdditionalProductsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default AdditionalProductsModal;
