import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../app/atoms';
import { buildRequestOptions } from '../app/api';

const CategoriesList = () => {
  const user = useAtomValue(userAtom);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    configurator: false,
    bike: false,
    clothing: false,
  });
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    fetchCategories();
  }, [user.token]);

  const fetchCategories = async () => {
    const { url, options } = buildRequestOptions('categories', 'index', {
      token: user.token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.bike && formData.clothing) {
      setFormError("Une catégorie ne peut pas être à la fois 'Bike' et 'Clothing'.");
      return;
    }

    const endpoint = isEditing ? 'update' : 'create';
    const { url, options } = buildRequestOptions('categories', endpoint, {
      id: editingCategory ? editingCategory.id : undefined,
      token: user.token,
      body: formData,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      fetchCategories();
      setFormData({ name: '', configurator: false, bike: false, clothing: false });
      setIsEditing(false);
      setEditingCategory(null);
      setFormError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      configurator: category.configurator,
      bike: category.bike,
      clothing: category.clothing,
    });
    setIsEditing(true);
    setEditingCategory(category);
  };

  const handleDelete = async (id) => {
    const { url, options } = buildRequestOptions('categories', 'delete', {
      id,
      token: user.token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      fetchCategories();
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
  };

  const cancelDelete = () => {
    setCategoryToDelete(null);
  };

  const proceedDelete = () => {
    if (categoryToDelete) {
      handleDelete(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className={`max-w-3xl mx-auto p-6 shadow-md rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h3 className="text-2xl font-semibold mb-4">Liste des Catégories</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nom:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${isDarkMode ? 'bg-gray-700 text-white' : 'text-black'}`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Configurator:</label>
          <input
            type="checkbox"
            name="configurator"
            checked={formData.configurator}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Bike:</label>
          <input
            type="checkbox"
            name="bike"
            checked={formData.bike}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Clothing:</label>
          <input
            type="checkbox"
            name="clothing"
            checked={formData.clothing}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
        </div>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {isEditing ? 'Update' : 'Create'} Category
        </button>
      </form>
      <ul className="space-y-4">
        {categories.map(category => (
          <li key={category.id} className="border-b pb-4">
            <h4 className="text-xl">{category.name}</h4>
            <p>Configurator: {category.configurator ? 'Oui' : 'Non'}</p>
            <p>Bike: {category.bike ? 'Oui' : 'Non'}</p>
            <p>Clothing: {category.clothing ? 'Oui' : 'Non'}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
              >
                Editer
              </button>
              <button
                onClick={() => confirmDelete(category)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {categoryToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer la catégorie : {categoryToDelete.name}, et tous les produits qui lui sont associés?</p>
            <div className="flex justify-end">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Annuler
              </button>
              <button
                onClick={proceedDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
