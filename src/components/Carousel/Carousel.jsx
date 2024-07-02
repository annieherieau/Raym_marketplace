import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { isAuthAtom, updateCartAtom, userAtom } from "../../app/atoms";
import { useNavigate } from "react-router-dom";
import { buildRequestOptions } from "../../app/api";
import { useEffect } from "react";
import CartButton from "../CartButton/CartButton.jsx";
import Modal from "../Modal/Modal.jsx";
import "./Carousel.css"; 

const Carousel = ({ products, selectedProduct }) => {
  const { isAdmin, token } = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [, setUpdateCart] = useAtom(updateCartAtom);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + products.length) % products.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % products.length;
    setCurrentIndex(newIndex);
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const { url, options } = buildRequestOptions("cart_items", "create", {
        body: { product_id: products[currentIndex].id, quantity: 1 },
        token: token,
      });
      fetch(url, options)
        .then((response) => {
          if (response.status !== 201) {
            throw new Error("Item not added to cart");
          }
          return response.json();
        })
        .catch((error) => console.error("Error:", error));
      setUpdateCart(true);
    } else {
      setShowModal(true);
    }
  };

  // affichage du produit sélectionné (random ou hero)
  useEffect(() => {
    if (selectedProduct && products) {
      products.forEach((element, i) => {
        if (element == selectedProduct) {
          setCurrentIndex(i);
        }
      });
    }
  }, [products, selectedProduct]);

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden p-4 w-full h-full">
        <img
          src={products[currentIndex].photo_url}
          alt={`${products[currentIndex].name}`}
          className="w-full h-full object-cover"
        />
        <div className="rounded-md py-2 mt-3 text-center">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            {products[currentIndex].name}
          </h3>
          <p className="text-white">
            {products[currentIndex].price
              ? `${parseFloat(products[currentIndex].price).toFixed(2)} €`
              : "0.00 €"}
          </p>
        </div>
        <div className="mt-3 text-center">
          <CartButton onClick={handleAddToCart} />
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="arrow-button left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="arrow-button right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
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
              onClick={() => navigate("/login?redirect=configurateur")}
              className="my-5 px-8 py-3 font-semibold rounded bg-gray-800 dark:bg-gray-100 text-gray-100 hover:bg-green-500 dark:hover:bg-gray-700"
            >
              Se Connecter
            </button>
          )}
        </>
      </Modal>
    </div>
  );
};

export default Carousel;

