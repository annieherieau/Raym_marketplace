import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, isAuthAtom, updateCartAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";
import Comments from "../components/Comments";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import CartButton from "../components/CartButton/CartButton";

const ProductPage = () => {
  const { productId } = useParams();
  const { token, isAdmin } = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setUpdateCart] = useAtom(updateCartAtom);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const { url, options } = buildRequestOptions("cart_items", "create", {
        body: { product_id: product.id, quantity: 1 },
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

  const toggleImageFullScreen = () => {
    setIsImageFullScreen(!isImageFullScreen);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { url, options } = buildRequestOptions("products", "show", {
        id: productId,
      });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { url, options } = buildRequestOptions(null, "current_user", {
        token,
      });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch current user");
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUser();
    }
  }, [isLoggedIn, token]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-black dark:bg-gray-800 py-8 rounded-[20px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row mx-auto">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              {product.photo_url && (
                <>
                  {isImageFullScreen && (
                    <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-40"></div>
                  )}
                  <img
                    className={`w-full h-full pt-5 ${isImageFullScreen ? 'fixed top-0 left-0 w-[75%] h-[75%] z-50 transform -translate-x-1/2 -translate-y-1/2' : 'object-cover'}`}
                    src={product.photo_url}
                    alt={product.name}
                    onClick={toggleImageFullScreen}
                    style={isImageFullScreen ? { top: '50%', left: '50%', objectFit: 'contain' } : {}}
                  />
                </>
              )}
            </div>
            {!isAdmin && (
              <div className="flex -mx-2 mb-4">
                <div className="w-full px-2">
                  <CartButton onClick={handleAddToCart} />
                </div>
              </div>
            )}
          </div>
          <div className="md:flex-1 px-4">
            <h1
              className="text-5xl font-bold text-green-400 dark:text-white mb-2"
              style={{ fontFamily: "Chakra Petch" }}
            >
              {product.name}
            </h1>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-100 dark:text-gray-300">
                  Prix:
                </span>
                <span className="text-palegreen-500 dark:text-gray-300 text-3xl">
                  {" "}
                  {parseFloat(product.price).toFixed(2)}€
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-100 dark:text-gray-300">
                Description:
              </span>
              <p className="text-gray-100 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
              <p className="text-gray-100 dark:text-gray-300 text-sm mt-2">
                {product.long_description}
              </p>
            </div>
            <Comments
              productId={productId}
              isLoggedIn={isLoggedIn}
              token={token}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Ajouter au panier"
      >
        <>
          <p>Veuillez vous connecter pour commander</p>
          <button
            type="button"
            onClick={() => navigate(`/login?redirect=product/${product.id}`)}
            className="my-5 px-8 py-3 font-semibold rounded bg-gray-800 dark:bg-gray-100 text-gray-100 hover:bg-green-500 dark:hover:bg-gray-700"
          >
            Se Connecter
          </button>
        </>
      </Modal>
    </div>
  );
};

export default ProductPage;
