import PropTypes from 'prop-types';
import { buildRequestOptions } from '../app/api';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const { token } = useAtomValue(userAtom);

  const handleRemove = () => {
    const { url, options } = buildRequestOptions('cart_items', 'delete', {
      id: item.id, 
      token: token
    });
  console.log(url, options);
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('item not removed');
        }
        onRemove(item.id);
      })
      .catch(error => console.error('Error:', error));
  };
  

  const handleChangeQuantity = (newQuantity) => {
    const { url, options } = buildRequestOptions('cart_items', 'update', {
      id: item.id,
      body: { quantity: newQuantity },
      token: token
    });
  
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('item not updated');
        }
        onUpdateQuantity(newQuantity);
      })
      .catch(error => console.error('Error:', error));
  };
  

  return (
    <div>
      <h3>{item.product.name}</h3>
      <p>{item.id}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => handleChangeQuantity(item.quantity - 1)}>-</button>
      <button onClick={() => handleChangeQuantity(item.quantity + 1)}>+</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemove: PropTypes.func,
  onUpdateQuantity: PropTypes.func,
};

export default CartItem;
