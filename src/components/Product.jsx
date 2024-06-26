import PropTypes from "prop-types";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, isAuthAtom, updateCartAtom } from "../app/atoms";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { buildRequestOptions } from "../app/api";

const Product = ({ product, isAdmin, onUpdateProduct, onDeleteProduct }) => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate();
  const [, setUpdateCart] = useAtom(updateCartAtom);

  const handleAddToCart = () => {
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
  };

  const handleUpdateClick = () => {
    navigate(`/products/${product.id}/edit`); // Navigue vers la page d'édition
  };

  const handleDeleteClick = () => {
    onDeleteProduct(product.id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {product.photo_url && (
        <img
          src={product.photo_url}
          alt={product.name}
          className="w-24 h-24 object-cover mb-4 rounded"
        />
      )}
      <div className="flex items-center space-x-4">
        {isLoggedIn && !isAdmin && (
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
        <Link
          to={`/product/${product.id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
        {isAdmin && (
          <div className="flex space-x-2">
            <button
              onClick={handleUpdateClick}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string, // Ajout de la prop photo_url
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired, // Ajout de la prop isAdmin
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default Product;
