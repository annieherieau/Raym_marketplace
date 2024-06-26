import React, { useState } from 'react';
import AccessibilityPanel from './AccessibilityPanel'; // Assure-toi d'avoir ce composant
import './accessibility.css';

const AccessibilityIcon = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      <div className="accessibility-icon" onClick={togglePanel}>
        <i className="fas fa-universal-access"></i>
      </div>
      {isPanelOpen && <AccessibilityPanel onClose={togglePanel} />}
    </>
  );
};

export default AccessibilityIcon;
