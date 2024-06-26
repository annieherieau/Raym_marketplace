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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
