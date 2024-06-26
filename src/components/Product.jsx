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
    navigate(`/products/${product.id}/edit`);
  };

  const handleDeleteClick = () => {
    onDeleteProduct(product.id);
  };

  return (
    <div className="p-4 w-full">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
        <a className="block relative h-48 rounded-t-2xl overflow-hidden">
          <img
            alt={product.name}
            className="object-cover object-center w-full h-full block"
            src={product.photo_url || "https://dummyimage.com/420x260"}
          />
        </a>
        <div className="p-6">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {product.category || "CATEGORY"}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {product.name}
          </h2>
          <p className="mt-1">{product.price ? `$${product.price}` : "$0.00"}</p>
          <p className="mt-1">{product.description}</p>
          {isLoggedIn && !isAdmin && (
            <button
              onClick={handleAddToCart}
              className="mt-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Add to Cart
            </button>
          )}
          <Link
            to={`/product/${product.id}`}
            className="mt-2 text-indigo-500 inline-flex items-center"
          >
            View Details
          </Link>
          {isAdmin && (
            <div className="mt-2">
              <button
                onClick={handleUpdateClick}
                className="text-white bg-yellow-500 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-600 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    photo_url: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default Product;
