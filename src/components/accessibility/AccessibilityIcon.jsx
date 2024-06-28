import React, { useState, useEffect } from 'react';
import AccessibilityPanel from './AccessibilityPanel';
import '../../index.css';

const AccessibilityIcon = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const savedFilter = localStorage.getItem('activeFilter');
    if (savedFilter) {
      document.body.classList.add(savedFilter);
      setActiveFilter(savedFilter);
    }

    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark-mode');
    }

    const openDyslexic = localStorage.getItem('openDyslexic') === 'true';
    if (openDyslexic) {
      document.body.classList.add('open-dyslexic');
    }

    const textSize = localStorage.getItem('textSize');
    if (textSize) {
      document.body.style.fontSize = textSize;
    }
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleFilter = (filterClass) => {
    if (activeFilter === filterClass) {
      document.body.classList.remove(filterClass);
      setActiveFilter(null);
      localStorage.removeItem('activeFilter');
    } else {
      document.body.classList.remove(activeFilter);
      document.body.classList.add(filterClass);
      setActiveFilter(filterClass);
      localStorage.setItem('activeFilter', filterClass);
    }
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const darkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', darkMode);
  };

  const toggleOpenDyslexic = () => {
    document.body.classList.toggle('open-dyslexic');
    const openDyslexic = document.body.classList.contains('open-dyslexic');
    localStorage.setItem('openDyslexic', openDyslexic);
  };

  const increaseTextSize = () => {
    document.body.style.fontSize = 'larger';
    localStorage.setItem('textSize', 'larger');
  };

  const decreaseTextSize = () => {
    document.body.style.fontSize = 'smaller';
    localStorage.setItem('textSize', 'smaller');
  };

  return (
    <>
      <div className="accessibility-icon fixed bottom-4 left-4 bg-blue-500 text-white p-4 rounded-full cursor-pointer z-50 flex items-center justify-center" onClick={togglePanel}>
        <i className="fas fa-universal-access text-2xl"></i>
      </div>
      {isPanelOpen && (
        <AccessibilityPanel 
          onClose={togglePanel}
          activeFilter={activeFilter}
          toggleFilter={toggleFilter}
          toggleDarkMode={toggleDarkMode}
          toggleOpenDyslexic={toggleOpenDyslexic}
          increaseTextSize={increaseTextSize}
          decreaseTextSize={decreaseTextSize}
        />
      )}
    </>
  );
};

export default AccessibilityIcon;
