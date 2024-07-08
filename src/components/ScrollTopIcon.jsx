import React, { useState, useEffect } from 'react';

const ScrollTopIcon = () => {
    // visibilité du bouton 
  const [isVisible, setIsVisible] = useState(false);

  const handleWheel = () => {
    // Position scroll avec overflow: auto (wheel fonctionne, scroll non) --> marchera pas si l'user a une scrollbar et s'en sert
    const scrollTop = document.getElementById('root').scrollTop;
    // au delà de 300 pixels scrollés, le bouton apparaît (is visible = true)
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    // root est l'élément évalué par scrollTop
    document.getElementById('root').scrollTo({
      top: 0,
      // c'est de l'animation de scroll
      behavior: 'smooth',
    });
    setIsVisible(false); // Cache le bouton après le clic
  };

  useEffect(() => {
    const rootElement = document.getElementById('root');
    rootElement.addEventListener('wheel', handleWheel);

    // Initial check
    handleWheel();

    return () => {
      rootElement.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-5 z-50"> 
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-transform duration-300 transform hover:scale-110 focus:outline-none focus:ring focus:ring-blue-300"
          style={{ zIndex: 1001 }}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollTopIcon;
