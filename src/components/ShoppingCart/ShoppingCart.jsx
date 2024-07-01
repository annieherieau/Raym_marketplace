import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAtom, useAtomValue } from "jotai";
import { updateCartAtom, userAtom } from "../../app/atoms";
import { buildRequestOptions } from "../../app/api";
import CartItem from "./CartItem";

export default function ShoppingCart({
  isOpen,
  onClose,
  onRemoveItem = () => {},
  onUpdateItem = () => {},
}) {
  const { token } = useAtomValue(userAtom);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [cartAmount, setCartAmount] = useState(0);
  const [updateCart, setUpdateCart] = useAtom(updateCartAtom);

  // Récupération du mode sombre depuis le localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  const fetchCart = async () => {
    const { url, options } = buildRequestOptions("cart", "cart", {
      token: token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Cart not fetched");
      }
      const data = await response.json();
      const updatedItems = data.items.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      setCartItems(updatedItems);
      setCartAmount(data.amount);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Error fetching cart. Please try again later.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
      setUpdateCart(false);
    }
  }, [token, updateCart]);

  const handleResponse = (response, action) => {
    if (action === "validate") {
      onClose();
      window.location.replace(`/order/${response.order.id}`);
    }
  };

  const handleUpdateCart = (event) => {
    event.preventDefault();
    const action = event.target.id;
    const { url, options } = buildRequestOptions("cart", "cart_update", {
      token: token,
      body: { cart: { action: action } },
    });
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => handleResponse(response, action))
      .catch((err) =>
        setError(`Error occured. Please try again later. ${err}`)
      );
    setCartItems([]);
    setCartAmount(0);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-50" onClose={onClose}>
        <TransitionChild
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-300 sm:duration-400"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className={`pointer-events-auto w-screen max-w-md rounded-l-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                  <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-3xl font-bold">
                          Votre Panier
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="sr-only">Fermer le panier</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cartItems.length > 0 ? (
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((item) => (
                                <CartItem
                                  key={item.id}
                                  item={item}
                                  onRemove={() => onRemoveItem(item.id)}
                                  onUpdateQuantity={(quantity) =>
                                    onUpdateItem(item.id, quantity)
                                  }
                                />
                              ))}
                            </ul>
                          ) : (
                            <p>Votre panier est vide.</p>
                          )}

                          {cartItems.length > 0 && (
                            <div className="mt-6 flex justify-end">
                              <button
                                type="button"
                                id="clear"
                                className="flex items-center justify-center rounded-md border border-transparent bg-red-500 px-2.5 py-2 text-base font-bold text-white shadow-sm hover:bg-red-600 mt-20"
                                onClick={handleUpdateCart}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="mr-2"
                                />
                                Vider le panier
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium">
                        <p>TOTAL TTC</p>
                        <p>{cartAmount}&nbsp;€</p>
                      </div>
                      <p className="mt-0.5 text-sm">
                        Vos produits seront disponibles en magasin sous 24h.
                      </p>
                      {cartAmount!=0 && (
                        <div className="mt-6">
                          <a
                            href="#"
                            onClick={handleUpdateCart}
                            id="validate"
                            className="flex items-center justify-center rounded-md border border-transparent bg-green-300 px-6 py-3 text-base font-bold shadow-sm hover:bg-green-400"
                          >
                            Valider mon Panier
                          </a>
                        </div>
                      )}
                      <div className="mt-6 flex justify-center text-center text-sm">
                        <p>
                          ou{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={onClose}
                          >
                            Continuer mes achats
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

ShoppingCart.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func,
  onUpdateItem: PropTypes.func,
};
