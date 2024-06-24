import './Menu.css';
import { useEffect, useState, useRef } from 'react';
import logo from '../../../Images/raymB.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'; 
import ShoppingCart from '../../ShoppingCarts/ShoppingCarts';

const Navbar = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const userIconRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserIconHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleUserIconLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const handleDropdownHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const handleMenuButtonClick = () => {
    updateClipPath();
    setIsRevealed(!isRevealed);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
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
          <i ref={userIconRef} className="fas fa-user text-2xl cursor-pointer user-icon" onClick={handleUserIconClick} onMouseEnter={handleUserIconHover} onMouseLeave={handleUserIconLeave}></i>
          <FontAwesomeIcon icon={faShoppingCart} className="text-2xl cursor-pointer cart-icon" onClick={handleCartToggle} />
          <button ref={buttonRef} className={`header__button nav-btn-js ${isRevealed ? 'open' : ''}`} type="button" onClick={handleMenuButtonClick}></button>
        </div>
      </header>
      <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`} onMouseEnter={handleDropdownHover} onMouseLeave={handleDropdownLeave}>
        <ul>
        <li className="header__menu-item mt-10 mb-8 border-b border-gray-300">
            <a>
               <span className="font-bold text-xl">Username@gmail.com</span>
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faAddressCard} className="icon-spacing" /> Mon compte
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="icon-spacing" /> Connection
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="icon-spacing" /> Inscription
            </a>
          </li>
          <li className="header__menu-item">
            <a href="#">
              <FontAwesomeIcon icon={faArrowRightToBracket} className="inverted-icon icon-spacing" /> Deconnection
            </a>
          </li>
        </ul>
      </div>
      <ShoppingCart isOpen={isCartOpen} onClose={handleCartToggle} />
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
          <li className="header__menu-item"><a href="#">Boutique</a></li>
          <li className="header__menu-item"><a href="#">Configurateur</a></li>
          <li className="header__menu-item"><a href="#">Entretien</a></li>
          <li className="header__menu-item"><a href="#">Contacts</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
