import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'; // Importez useState ici
import CartItem from './CartItem';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';

const Cart = ({ onRemoveItem = () => {}, onUpdateItem = () => {} }) => {
  const { token } = useAtomValue(userAtom);
  const [cartItems, setCartItems] = useState([]); // Utilisez useState pour gérer cartItems
  const [error, setError] = useState(null); // État pour gérer les erreurs

  const fetchCart = async () => {
    const { url, options } = buildRequestOptions('cart', 'cart', {
      token: token
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Cart not fetched');
      }
      const data = await response.json();
      console.log('Cart fetched:', data);
      setCartItems(data); // Mettre à jour cartItems avec les données récupérées
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Error fetching cart. Please try again later.'); // Définir l'erreur d'état en cas de problème de récupération
    }
  };

  // Appeler fetchCart lorsque le composant est monté ou que token change
  useEffect(() => {
    if (token) {     
      fetchCart();
    }
  }, [token]);


  const handleActionComplete = () => {
    fetchCart();
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Mon panier</h2>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={() => onRemoveItem(item.id)}
            onUpdateQuantity={(quantity) => onUpdateItem(item.id, quantity)}
            onActionComplete={handleActionComplete}
          />
        ))
      ) : (
      
        <p>Votre panier est vide.</p>
      )}
    </div>
  );
};

Cart.propTypes = {
  onRemoveItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
  onActionComplete: PropTypes.func,
};

export default Cart;
