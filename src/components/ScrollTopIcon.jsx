import React, { useState, useEffect } from 'react';

const ScrollTopIcon = () => {
  // État pour gérer la visibilité du bouton de retour en haut
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Position de défilement de l'élément avec overflow: auto
    const scrollTop = document.getElementById('root').scrollTop;
    // Met à jour la visibilité du bouton en fonction de la position de défilement
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    // Défilement fluide vers le haut de la page
    document.getElementById('root').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Cache le bouton après le clic
    setIsVisible(false);
  };

  useEffect(() => {
    const rootElement = document.getElementById('root');
    // Ajoute les écouteurs d'événements pour le défilement
    rootElement.addEventListener('scroll', handleScroll);

    // Vérification initiale de la position de défilement
    handleScroll();

    return () => {
      // Supprime les écouteurs d'événements lors du démontage du composant
      rootElement.removeEventListener('scroll', handleScroll);
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
