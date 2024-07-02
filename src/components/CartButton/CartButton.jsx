import React, { useState } from "react";
import "./CartButton.css";
import { useAtomValue } from "jotai";
import { isAuthAtom, userAtom } from "../../app/atoms";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CartButton({ onClick }) {
  const [clicked, setClicked] = useState(false);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const { isAdmin } = useAtomValue(userAtom);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (isLoggedIn && !isAdmin) {
      setClicked(true);
      onClick();
      setTimeout(() => setClicked(false), 2000); // Réinitialiser l'animation après 2 secondes
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {!isAdmin && (
        <button
          className={`cart-button ${clicked ? "clicked" : ""}`}
          onClick={handleClick}
        >
          <span className="add-to-cart">Ajouter au panier</span>
          <span className="added">Ajouté !</span>
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-box"></i>
        </button>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Ajouter au panier"
      >
        <>
          <p>
            {isAdmin
              ? "Vous êtes administrateur. Vous ne pouvez pas commander !"
              : "Veuillez vous connecter pour commander"}
          </p>
          {!isAdmin && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/login?redirect=${
                    location.pathname != "/" ? location.pathname : ""
                  } `
                )
              }
              className="my-5 px-8 py-3 font-semibold rounded bg-gray-800 dark:bg-gray-100 text-gray-100 hover:bg-green-500 dark:hover:bg-gray-700"
            >
              Se Connecter
            </button>
          )}
        </>
      </Modal>
    </>
  );
}
