import React from 'react';
import './accessibility.css';

const AccessibilityPanel = ({ onClose }) => {
  return (
    <div className="accessibility-panel">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Paramètres d'accessibilité</h2>
      <div>
        <button>Augmenter la taille du texte</button>
      </div>
      <div>
        <button>Diminuer la taille du texte</button>
      </div>
      <div>
        <button>Contraste élevé</button>
      </div>
      <div>
        <button>Mode sombre</button>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
