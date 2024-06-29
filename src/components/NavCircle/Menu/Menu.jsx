import "./Menu.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, openCartAtom, userAtom } from "../../../app/atoms";
import { removeCookie } from "../../../app/utils";
import { buildRequestOptions } from "../../../app/api";

const Navbar = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useAtom(openCartAtom);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const userIconRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const location = useLocation();
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  // vérification du statut admin
  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      const { url, options } = buildRequestOptions(null, 'admin_check', { token: user.token });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to check admin status");
        }

        const data = await response.json();
        setIsAdmin(data.admin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

  // requête déconnexion
  const handleLogout = () => {
    const { url, options } = buildRequestOptions("users", "sign_out", {
      token: user.token,
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response))
      .catch((err) => console.error(err));
  };

  // réponse déconnexion
  const handleResponse = (response) => {
    if (response.status.code === 200) {
      removeCookie();
      setIsDropdownOpen(false);
      navigate('/');
      window.location.reload();
    }
  };

  // click sur icône User > toggle du dropdown
  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // hover sur icône User > affichage du dropdown
  const handleUserIconHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  // leave icône User > disparition du dropdown
  const handleUserIconLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  // hover sur dropdown > affichage du dropdown
  const handleDropdownHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  // leave dropdown > disparition du dropdown
  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const handleMenuButtonClick = () => {
    updateClipPath();
    setIsRevealed(!isRevealed);
  };

  // toggle du volet panier
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const updateClipPath = () => {
    if (!buttonRef.current || !navRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const clipX = (((buttonRect.left + buttonRect.right) / 2 - navRect.left) / navRect.width) * 100;
    const clipY = (((buttonRect.top + buttonRect.bottom) / 2 - navRect.top) / navRect.height) * 100;

    navRef.current.style.setProperty("--clip-x", `${clipX}%`);
    navRef.current.style.setProperty("--clip-y", `${clipY}%`);
  };

  // gestion du clic sur un élément du menu
  const handleMenuItemClick = (event, href) => {
    event.preventDefault();
    setIsLoading(true);
    navigate(href);
  };

  // fermer le menu une fois la nouvelle page chargée
  useEffect(() => {
    if (isLoading) {
      setIsRevealed(false);
      setIsLoading(false);
    }
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-body">
      <header className="header__content p-4">
        <a href="/" className="logo-container">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 908 302" preserveAspectRatio="xMidYMid meet" className="logo">
            <g id="logo-content" transform="translate(0,302) scale(0.1,-0.1)" fill="#000000" stroke="none" className="logo">
              <path d="M515 3008 c-2 -7 -115 -515 -250 -1128 -136 -613 -250 -1132 -255 -1152 l-8 -38 302 0 301 0 84 383 c47 210 86 388 89 395 3 10 43 12 170 10 l165 -3 107 -390 107 -390 331 -3 c183 -1 332 1 332 5 0 4 -61 186 -135 404 -74 218 -135 401 -135 406 0 6 19 16 43 23 198 59 394 234 492 441 56 118 77 215 78 354 2 208 -50 335 -192 475 -99 97 -178 144 -316 187 l-90 27 -608 4 c-491 2 -608 1 -612 -10z m1038 -512 c170 -61 211 -285 75 -412 -86 -82 -159 -96 -484 -92 l-251 3 54 245 c29 135 55 251 58 258 7 18 495 16 548 -2z"/>
              <path d="M3100 2413 c-72 -8 -232 -43 -305 -68 -129 -43 -335 -156 -335 -184 0 -7 196 -370 206 -380 2 -2 21 8 42 21 134 89 271 132 422 133 163 0 253 -37 298 -125 19 -38 22 -60 22 -158 l0 -114 -37 36 c-44 43 -151 97 -238 121 -93 25 -293 31 -394 11 -261 -49 -404 -209 -418 -466 -9 -174 37 -301 152 -415 82 -82 161 -125 285 -156 193 -49 440 5 598 130 l52 41 0 -75 0 -75 315 0 315 0 0 549 c0 594 -5 659 -55 782 -52 128 -156 238 -287 305 -142 72 -421 110 -638 87z m215 -1098 c33 -9 77 -27 98 -41 35 -23 37 -27 37 -78 0 -61 -10 -73 -85 -108 -42 -19 -67 -23 -160 -23 -96 0 -116 3 -153 23 -112 60 -79 200 54 231 61 14 144 12 209 -4z"/>
              <path d="M7307 2400 c-115 -24 -257 -93 -331 -161 l-56 -51 0 96 0 96 -315 0 -315 0 0 -845 0 -845 315 0 315 0 0 524 0 524 45 40 c74 65 107 77 212 77 107 0 134 -13 171 -85 22 -44 22 -45 22 -562 l0 -518 315 0 315 0 0 524 0 524 45 40 c74 65 107 77 212 77 107 0 134 -13 171 -85 22 -44 22 -45 22 -562 l0 -518 315 0 315 0 0 653 c0 615 -1 658 -19 730 -23 89 -41 127 -89 185 -77 96 -202 150 -366 159 -224 13 -424 -65 -576 -223 -34 -36 -63 -64 -64 -62 -44 104 -121 190 -206 231 -117 57 -290 71 -453 37z"/>
              <path d="M4224 2318 c13 -35 161 -420 330 -856 168 -435 306 -800 306 -810 0 -33 -30 -61 -82 -77 -66 -19 -198 -20 -243 -1 -42 18 -33 49 -85 -284 -30 -194 -37 -256 -27 -262 23 -14 124 -23 257 -22 356 3 582 116 710 355 23 44 402 1015 770 1972 l18 47 -333 0 -332 0 -158 -467 c-87 -258 -160 -473 -164 -480 -4 -7 -78 203 -166 467 l-160 480 -332 0 -333 0 24 -62z"/>
            </g>
          </svg>
        </a>
        <div className="icons-container">
          <i
            ref={userIconRef}
            className="fas fa-user text-2xl cursor-pointer user-icon"
            onClick={handleUserIconClick}
            onMouseEnter={handleUserIconHover}
            onMouseLeave={handleUserIconLeave}
          ></i>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-2xl cursor-pointer cart-icon"
            onClick={handleCartToggle}
          />
          <button
            ref={buttonRef}
            className={`header__button nav-btn-js ${isRevealed ? "open" : ""}`}
            type="button"
            onClick={handleMenuButtonClick}
          ></button>
        </div>
      </header>
      {/* DROPDOWN MENU */}
      <div
        className={`dropdown-menu ${isDropdownOpen ? "open" : ""} ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        onMouseEnter={handleDropdownHover}
        onMouseLeave={handleDropdownLeave}
      >
        <ul>
          {!isLoggedIn && (
            <>
              <li className='header__menu-item' >
                <a href="/login" onClick={(e) => handleMenuItemClick(e, "/login")}>
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className={`${isDarkMode ? 'text-white' : 'text-black'} icon-spacing`}
                  />{" "}
                 <span className={isDarkMode ? 'text-white' : 'text-black'}>
                      Connexion
                  </span>
                </a>
              </li>
              <li className="header__menu-item">
                <a href="/register" onClick={(e) => handleMenuItemClick(e, "/register")}>
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className={`${isDarkMode ? 'text-white' : 'text-black'} icon-spacing`}
                  />{" "}
                      <span className={isDarkMode ? 'text-white' : 'text-black'}>
                        Inscription
                      </span>
                </a>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="header__menu-item mt-10 mb-8 border-b border-gray-300">
                <a>
                <span className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {user.email}
                </span>
                </a>
              </li>
              <li className="header__menu-item">
                <a href="/my_account" onClick={(e) => handleMenuItemClick(e, "/my_account")}>
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className={`${isDarkMode ? 'text-white' : 'text-black'} icon-spacing`}
                  />{" "}
                  <span className={isDarkMode ? 'text-white' : 'text-black'}>
                    Mon Compte
                  </span>
                </a>
              </li>
            </>
          )}
          {isAdmin && (
            <li className="header__menu-item">
              <a href="/admin" onClick={(e) => handleMenuItemClick(e, "/admin")}>
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className={`${isDarkMode ? 'text-white' : 'text-black'} icon-spacing`}
                />{" "}
               <span className={isDarkMode ? 'text-white' : 'text-black'}>
                  Dashboard
                </span>
              </a>
            </li>
          )}

          {isLoggedIn && (
            <li className="header__menu-item">
              <a href="#" onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className={`${isDarkMode ? 'text-white' : 'text-black'} reverted-icon icon-spacing`}
                />{" "}
                <span className={isDarkMode ? 'text-white' : 'text-black'}>
                  Deconnexion
                </span>
              </a>
            </li>
          )}
        </ul>
      </div>
      {/* fin DROPDOWN MENU */}
      {/* PANIER (CART) */}
      {isLoggedIn && !isAdmin && (<ShoppingCart isOpen={isCartOpen} onClose={handleCartToggle} />)}
      {/* fin (CART) */}
      {/* MENU VIDEO */}
      <nav
        ref={navRef}
        className="header__nav nav-js"
        data-active={isRevealed ? "true" : "false"}
      >
        <section className="clip-text-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            width="100%"
            controls
          >
            <source
              src="/src/assets/MTB.mp4"
              type="video/mp4"
            />
          </video>
          <div className="clip-text-video__overlay"></div>
          <div className="clip-text-video__text">
            <p>RAYM</p>
          </div>
          <div className="clip-text-video__overlay-bottom"></div>
        </section>
        {/* LIENS MENU VIDEO */}
        <ul className="header__menu">
          <li className="header__menu-item">
            <a href="/" onClick={(e) => handleMenuItemClick(e, "/")}>Accueil</a>
          </li>
          <li className="header__menu-item">
            <a href="/brand" onClick={(e) => handleMenuItemClick(e, "/brand")}>La marque</a>
          </li>
          <li className="header__menu-item">
            <a href="/shop" onClick={(e) => handleMenuItemClick(e, "/shop")}>Boutique</a>
          </li>
          <li className="header__menu-item">
            <a href="/configurator" onClick={(e) => handleMenuItemClick(e, "/configurateur")}>Configurateur</a>
          </li>
          <li className="header__menu-item">
            <a href="/maintenance" onClick={(e) => handleMenuItemClick(e, "/maintenance")}>Entretien</a>
          </li>
          <li className="header__menu-item">
            <a href="/contact" onClick={(e) => handleMenuItemClick(e, "/contact")}>Contact</a>
          </li>
        </ul>
        {/* fin LIENS MENU VIDEO */}
      </nav>
       {/* fin MENU VIDEO */}
    </div>
  );
};

export default Navbar;
