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
    <div className="p-6">
      <img
        alt={product.name}
        className="w-full h-100 object-cover"
        src={product.photo_url || "https://dummyimage.com/420x260"}
      />
      <div className="p-6">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {product.category.name || "CATEGORY"}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {product.name}
        </h2>
        <p className="mt-1">{product.price ? `$${product.price}` : "$0.00"}</p>
        <p className="mt-1">{product.description}</p>
        {isLoggedIn && !isAdmin && (
          <button
            onClick={handleAddToCart}
            className="mt-2 text-black font-bold bg-palegreen-500 border-0 py-2 px-4 focus:outline-none hover:bg-palegreen-600 rounded"
          >
            Ajouter au panier
          </button>
        )}
        <Link
          to={`/product/${product.id}`}
          className="mt-2 text-indigo-500 inline-flex items-center ml-4"
        >
          Voir l'article
        </Link>
        {isAdmin && (
          <div className="mt-2">
            <button
              onClick={handleUpdateClick}
              className="text-white bg-yellow-500 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-600 rounded mr-2"
            >
              Modifier
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded"
            >
              Supprimer
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
    photo_url: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};


export default Product;
