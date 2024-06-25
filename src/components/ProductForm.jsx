// src/components/ProductForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { buildRequestOptions } from '../app/api';
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product ? product.name : '',
    description: product ? product.description : '',
    price: product ? product.price : '', // Laisse comme string ici
    photo: null, // Nouveau champ pour le fichier photo
  });
  const { token } = useAtomValue(userAtom);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = product ? 'update' : 'create';
    const dataToSubmit = new FormData();
    dataToSubmit.append('product[name]', formData.name);
    dataToSubmit.append('product[description]', formData.description);
    dataToSubmit.append('product[price]', Number(formData.price));
    if (formData.photo) {
      dataToSubmit.append('product[photo]', formData.photo);
    }

    const { url, options } = buildRequestOptions('products', endpoint, {
      id: product ? product.id : undefined,
      token: token,
    });

    options.body = dataToSubmit;
    options.headers = {
      'Authorization': `Bearer ${token}` // Pass the token in the headers
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition duration-300"
      >
        {product ? 'Update' : 'Create'} Product
      </button>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    photo: PropTypes.object, // Ajout de la prop photo
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
