import React, { useState } from 'react';
import '../../index.css';

const AccessibilityPanel = ({
  onClose,
  activeFilter,
  toggleFilter,
  toggleDarkMode,
  toggleOpenDyslexic,
  increaseTextSize,
  decreaseTextSize,
}) => {
  const [activeTab, setActiveTab] = useState('general');

  const renderGeneralSettings = () => (
    <div className="space-y-2">
      <button
        onClick={toggleDarkMode}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Mode sombre
      </button>
      <button
        onClick={toggleOpenDyslexic}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Police OpenDyslexic
      </button>
      <button
        onClick={increaseTextSize}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Augmenter la taille du texte
      </button>
      <button
        onClick={decreaseTextSize}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Diminuer la taille du texte
      </button>
    </div>
  );

  const renderFilterSettings = () => (
    <div className="space-y-2">
      <button
        onClick={() => toggleFilter('high-contrast')}
        className={`w-full py-2 px-4 ${activeFilter === 'high-contrast' ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600`}
      >
        Contraste élevé
      </button>
      <button
        onClick={() => toggleFilter('blue-light-filter')}
        className={`w-full py-2 px-4 ${activeFilter === 'blue-light-filter' ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600`}
      >
        Filtre anti lumière bleue
      </button>
      <button
        onClick={() => toggleFilter('protanopia-mode')}
        className={`w-full py-2 px-4 ${activeFilter === 'protanopia-mode' ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600`}
      >
        Mode Protanopie
      </button>
      <button
        onClick={() => toggleFilter('deuteranopia-mode')}
        className={`w-full py-2 px-4 ${activeFilter === 'deuteranopia-mode' ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600`}
      >
        Mode Deutéranopie
      </button>
      <button
        onClick={() => toggleFilter('tritanopia-mode')}
        className={`w-full py-2 px-4 ${activeFilter === 'tritanopia-mode' ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-lg hover:bg-blue-600`}
      >
        Mode Tritanopie
      </button>
    </div>
  );

  return (
    <div className="fixed bottom-16 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 w-64 accessibility-panel">
      <button className="absolute top-2 right-2 text-red-500 close-btn" onClick={onClose}>
        X
      </button>
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Paramètres d'accessibilité
      </h2>
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('general')}
          className={`w-1/2 py-2 ${activeTab === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Général
        </button>
        <button
          onClick={() => setActiveTab('filters')}
          className={`w-1/2 py-2 ${activeTab === 'filters' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Filtres
        </button>
      </div>
      {activeTab === 'general' ? renderGeneralSettings() : renderFilterSettings()}
    </div>
  );
};

export default AccessibilityPanel;
