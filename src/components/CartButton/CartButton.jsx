import React, { useState } from 'react';
import './CartButton.css';

const CartButton = ({ onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 2000); // Réinitialiser l'animation après 2 secondes
  };

  return (
    <button className={`cart-button ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
      <span className="add-to-cart">Ajouter au panier</span>
      <span className="added">Ajouté !</span>
      <i className="fas fa-shopping-cart"></i>
      <i className="fas fa-box"></i>
    </button>
  );
};

export default CartButton;
