import PropTypes from "prop-types";
import { useAtom, useAtomValue } from "jotai";
import { userAtom, isAuthAtom, updateCartAtom } from "../app/atoms";
import { useNavigate, Link } from "react-router-dom";
import { buildRequestOptions } from "../app/api";
import CartButton from "./CartButton/CartButton";
import { useRef } from "react";
import SchemaOrg from './SchemaOrg';

const Product = ({ product, isAdmin, onUpdateProduct, onDeleteProduct }) => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const navigate = useNavigate();
  const [, setUpdateCart] = useAtom(updateCartAtom);
  
  // Récupérer l'état du mode sombre depuis le localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

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

  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.photo_url || "https://dummyimage.com/420x260",
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Raym Bicycle"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": product.price || 0,
      "url": `/products/${product.id}` // URL du produit
    }
  };

  return (
    <div className={`p-6 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <img
        alt={product.name}
        className="w-full h-100 object-cover"
        src={product.photo_url || "https://dummyimage.com/420x260"}
      />
      <div className="p-6">
        <h3 className={`text-xs tracking-widest title-font mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {product.category.name || "CATEGORY"}
        </h3>
        <h2 className={`title-font text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h2>
        <p className="mt-1">{product.price ? `${product.price.toFixed(2)}€` : "0.00€"}</p>
        <p className="mt-1 mb-4">{product.description}</p>
        {isLoggedIn && !isAdmin && (
          <CartButton onClick={handleAddToCart} />
        )}
        <Link
          to={`/product/${product.id}`}
          className={`inline-flex items-center ml-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`}
        >
          Voir l'article
        </Link>
        {isAdmin && (
          <div className="mt-2">
            <button
              onClick={handleUpdateClick}
              className={`text-white border-0 py-2 px-4 focus:outline-none rounded mr-2 ${isDarkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}
            >
              Modifier
            </button>
            <button
              onClick={handleDeleteClick}
              className={`text-white border-0 py-2 px-4 focus:outline-none rounded ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      <SchemaOrg data={schemaOrgData} />
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
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onUpdateProduct: PropTypes.func,
  onDeleteProduct: PropTypes.func,
};

export default Product;
