import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, isAuthAtom, updateCartAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';
import Comments from '../components/Comments';
import { useNavigate } from 'react-router-dom';

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

  const handleAddToCart = () => {
    if (isAdmin) {
      alert("Vous êtes administrateur. Vous ne pouvez pas commander !");
    } else if (isLoggedIn) {
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
      alert("Veuillez vous connecter pour commander");
      navigate(`/login?redirect=product/${product.id}`)
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { url, options } = buildRequestOptions('products', 'show', { id: productId });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
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
      const { url, options } = buildRequestOptions(null, 'current_user', { token });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch current user');
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
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
                <img
                  className="w-full h-full object-cover pt-5"
                  src={product.photo_url}
                  alt={product.name}
                />
              )}
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-full px-2">
                <button onClick={handleAddToCart} className="w-full bg-green-400 dark:bg-gray-600 text-gray-900 py-2 px-4 rounded-full font-bold hover:bg-green-600 dark:hover:bg-gray-700">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h1 className="text-5xl font-bold text-green-400 dark:text-white mb-2" style={{ fontFamily: "Chakra Petch" }}>{product.name}</h1>
            <p className="text-gray-100 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-100 dark:text-gray-300">Prix:</span>
                <span className="text-palegreen-500 dark:text-gray-300 text-3xl"> {product.price}€</span>
              </div>
              <div>
                <span className="font-bold text-gray-100 dark:text-gray-300"> Disponibilité: </span>
                <span className="text-palegreen-500 dark:text-gray-300 text-3xl"> En Stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-100 dark:text-gray-300">Description:</span>
              <p className="text-gray-100 dark:text-gray-300 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
              </p>
            </div>
            <Comments productId={productId} isLoggedIn={isLoggedIn} token={token} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
