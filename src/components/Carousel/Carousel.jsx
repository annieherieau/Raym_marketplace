import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { isAuthAtom, updateCartAtom, userAtom } from "../../app/atoms";
import { useNavigate } from "react-router-dom";

const Carousel = ({ slides, bike = true }) => {
  const {isAdmin} = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [, setUpdateCart] = useAtom(updateCartAtom);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const handleAddToCart = () => {
    if (isAdmin) {
      alert("Vous êtes administrateur. Vous ne pouvez pas commander !");
    } else if (isLoggedIn) {
      const { url, options } = buildRequestOptions("cart_items", "create", {
        body: { product_id: product.id, quantity: 1 },
        token: user.token,
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
      alert("Veuillez vous connecter pour commander");
      navigate('/login?redirect=configurateur')
    }
  };
  // bike ? "h-full":' w-auto max-w-60'
  return (
    // <div className="relative w-full max-w-lg mx-auto">
    <div className="relative">
      <div className=" bg-pink-300 overflow-hidden p-4">
        <img
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex}`}
          className="w-full h-auto"
        />
        <div className="mt-3 text-center">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            {slides[currentIndex].name}
          </h3>
          <p className="text-white">{slides[currentIndex].price} €</p>
        </div>
        <div className="mt-3 text-center">
          <button
            type="button"
            className="px-8 py-3 font-semibold rounded bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800"
            onClick={handleAddToCart}
          >
            Acheter
          </button>
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
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
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-lg focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
