import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const initialProducts = [
  {
    id: 1,
    name: 'Banane',
    href: '#',
    color: 'Saumon',
    size: 'L',
    price: 45.00,
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Sac à dos Satchel',
    href: '#',
    color: 'Bleu',
    size: 'XL',
    price: 32.00,
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export default function ShoppingCart({ isOpen, onClose }) {
  const [products, setProducts] = useState(initialProducts);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

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
                <DialogPanel className="pointer-events-auto w-screen max-w-md rounded-l-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-3xl font-bold text-gray-900">Votre Panier</DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Fermer le panier</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">€{product.price.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div>
                                    <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center">
                                      <span className="mr-2">Qté :</span>
                                      <input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                        className="w-16"
                                        style={{ textAlign: 'left', paddingLeft: '0', border: 'none', appearance: 'textfield', MozAppearance: 'textfield', outline: 'none', boxShadow: 'none', marginTop: '-2px' }}
                                      />
                                    </div>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 flex justify-end">
                            <button
                              type="button"
                              className="flex items-center justify-center rounded-md border border-transparent bg-red-500 px-1 py-0.5 text-base font-bold text-white shadow-sm hover:bg-red-600 mt-20"
                              onClick={() => console.log('Vider le panier')}
                            >
                              <FontAwesomeIcon icon={faTrash} className="mr-2" />
                              Vider le panier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>TOTAL TTC (hors frais de livraison)</p>
                        <p>€{calculateSubtotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Les frais de livraison seront ajoutés lors du paiement</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-green-300 px-6 py-3 text-base font-bold text-black shadow-sm hover:bg-green-400"
                        >
                          Commander
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          ou{' '}
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
  )
}

