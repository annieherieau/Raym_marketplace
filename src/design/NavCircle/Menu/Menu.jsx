import './Menu.css';
import { useEffect, useState, useRef } from 'react';
import logo from '../../../Images/raymB.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'; // Importez les icônes nécessaires
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'; // Importez l'icône nécessaire

const Navbar = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const userIconRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const handleUserIconHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleUserIconLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  const handleDropdownHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  };

  const handleMenuButtonClick = () => {
    updateClipPath();
    setIsRevealed(!isRevealed);
  };

  const updateClipPath = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const clipX = ((buttonRect.left + buttonRect.right) / 2 - navRect.left) / navRect.width * 100;
    const clipY = ((buttonRect.top + buttonRect.bottom) / 2 - navRect.top) / navRect.height * 100;

    navRef.current.style.setProperty('--clip-x', `${clipX}%`);
    navRef.current.style.setProperty('--clip-y', `${clipY}%`);
  };

  useEffect(() => {
    updateClipPath();
  }, [isRevealed]);

  useEffect(() => {
    updateClipPath();
  }, []);

  return (
    <div className="menu-body">
      <header className="header__content p-4">
        <img src={logo} alt="Logo" className="logo" />
        <div className="icons-container">
          <i ref={userIconRef} className="fas fa-user text-2xl cursor-pointer user-icon" onMouseEnter={handleUserIconHover} onMouseLeave={handleUserIconLeave}></i>
          <i className="fas fa-shopping-cart text-2xl cart-icon"></i>
          <button ref={buttonRef} className={`header__button nav-btn-js ${isRevealed ? 'open' : ''}`} type="button" onClick={handleMenuButtonClick}></button>
        </div>
      </header>
      <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`} onMouseEnter={handleDropdownHover} onMouseLeave={handleDropdownLeave}>
        <ul>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faAddressCard} className="icon-spacing" /> Mon compte
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="icon-spacing" /> Se connecter
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="inverted-icon icon-spacing" /> Se déconnecter
            </a>
          </li>
        </ul>
      </div>
      <nav ref={navRef} className="header__nav nav-js" data-active={isRevealed ? 'true' : 'false'}>
        <section className="clip-text-video">
          <video autoPlay loop muted playsInline preload="auto" width="100%" controls>
            <source src="/src/assets/components/NavCircle/Menu/MTB.mp4" type="video/mp4" />
          </video>
          <div className="clip-text-video__overlay"></div>
          <div className="clip-text-video__text">
            <p>RAYM</p>
          </div>
          <div className="clip-text-video__overlay-bottom"></div>
        </section>
        <ul className="header__menu">
          <li className="header__menu-item"><a href="#">Accueil</a></li>
          <li className="header__menu-item"><a href="#">La marque</a></li>
          <li className="header__menu-item"><a href="#">Configurateur</a></li>
          <li className="header__menu-item"><a href="#">Entretien</a></li>
          <li className="header__menu-item"><a href="#">Contacts</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;