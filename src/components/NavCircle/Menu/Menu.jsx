import "./Menu.css";
import { useEffect, useState, useRef } from "react";
import logo from "../../../assets/raymB.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { useAtom, useAtomValue } from "jotai";
import { isAuthAtom, openCartAtom, userAtom } from "../../../app/atoms";
import { removeCookie } from "../../../app/utils";
import { buildRequestOptions } from "../../../app/api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useAtom(openCartAtom);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const userIconRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // vérification du status admin
  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:3000/admin_check", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

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

  // réponse déconnexion
  const handleResponse = (response) => {
    if (response.status.code === 200) {
      removeCookie();
      navigate('/');
    }
  };

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

  // click sur icon User > toggle du dropdown
  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // hover sur icon User > affichage du dropdown
  const handleUserIconHover = () => {
    clearTimeout(closeTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  // Leave icon du User > disparition du dropdown
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

   //Leave dropdown > disparition du dropdown
  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  const handleMenuButtonClick = () => {
    updateClipPath();
    setIsRevealed(!isRevealed);
  };

  // Toggle du volet panier
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const updateClipPath = () => {
    if (!buttonRef.current || !navRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const clipX =
      (((buttonRect.left + buttonRect.right) / 2 - navRect.left) /
        navRect.width) *
      100;
    const clipY =
      (((buttonRect.top + buttonRect.bottom) / 2 - navRect.top) /
        navRect.height) *
      100;

    navRef.current.style.setProperty("--clip-x", `${clipX}%`);
    navRef.current.style.setProperty("--clip-y", `${clipY}%`);
  };

  useEffect(() => {
    updateClipPath();
  }, [isRevealed]);

  useEffect(() => {
    updateClipPath();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-body">
      <header className="header__content p-4">
        <a href="/">
          <img src={logo} alt="Logo" className="logo" />
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
        className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}
        onMouseEnter={handleDropdownHover}
        onMouseLeave={handleDropdownLeave}
      >
        <ul>
          {!isLoggedIn && (
            <>
              <li className="header__menu-item">
                <a href="/login">
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="icon-spacing"
                  />{" "}
                  Connection
                </a>
              </li>
              <li className="header__menu-item">
                <a href="/register">
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="icon-spacing"
                  />{" "}
                  Inscription
                </a>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="header__menu-item mt-10 mb-8 border-b border-gray-300">
                <a>
                  <span className="font-bold text-xl">{user.email}</span>
                </a>
              </li>
              <li className="header__menu-item">
                <a href="/my_account">
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    className="icon-spacing"
                  />{" "}
                  Mon compte
                </a>
              </li>
            </>
          )}
          {isAdmin && (
            <li className="header__menu-item">
              <a href="/admin">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="icon-spacing"
                />{" "}
                Dashboard
              </a>
            </li>
          )}

          {isLoggedIn && (
            <li className="header__menu-item">
              <a href="#" onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="inverted-icon icon-spacing"
                />{" "}
                Deconnection
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
              src="/src/components/NavCircle/Menu/MTB.mp4"
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
            <a href="/">Accueil</a>
          </li>
          <li className="header__menu-item">
            <a href="/brand">La marque</a>
          </li>
          <li className="header__menu-item">
            <a href="#">Boutique</a>
          </li>
          <li className="header__menu-item">
            <a href="/configurator">Configurateur</a>
          </li>
          <li className="header__menu-item">
            <a href="/maintenance">Entretien</a>
          </li>
          <li className="header__menu-item">
            <a href="/contacts">Contacts</a>
          </li>
        </ul>
        {/* fin LIENS MENU VIDEO */}
      </nav>
       {/* fin MENU VIDEO */}
    </div>
  );
};

export default Navbar;
