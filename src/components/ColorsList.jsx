import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { buildRequestOptions } from "../app/api";

const ColorsList = () => {
  const user = useAtomValue(userAtom);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    collection: "",
  });
  const [colorToDelete, setColorToDelete] = useState(null);
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  useEffect(() => {
    fetchColors();
  }, [user.token]);

  const fetchColors = async () => {
    const { url, options } = buildRequestOptions("colors", "index", {
      token: user.token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Échec de la récupération de colors");
      }
      const data = await response.json();
      setColors(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isEditing ? "update" : "create";
    const { url, options } = buildRequestOptions("colors", endpoint, {
      id: editingColor ? editingColor.id : undefined,
      token: user.token,
      body: formData,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Échec de l'envoi du formulaire");
      }
      fetchColors();
      setFormData({ name: "", collection: "" });
      setIsEditing(false);
      setEditingColor(null);
      setFormError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (color) => {
    setFormData({
      name: color.name,
      collection: color.collection,
    });
    setIsEditing(true);
    setEditingColor(color);
  };

  const handleDelete = async (id) => {
    const { url, options } = buildRequestOptions("colors", "delete", {
      id,
      token: user.token,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Échec de la suppression de color");
      }
      fetchColors();
    } catch (error) {
      setError(error.message);
    }
  };

  const confirmDelete = (color) => {
    setColorToDelete(color);
  };

  const cancelDelete = () => {
    setColorToDelete(null);
  };

  const proceedDelete = () => {
    if (colorToDelete) {
      handleDelete(colorToDelete.id);
      setColorToDelete(null);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      className={`max-w-3xl mx-auto p-6 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-md rounded-lg`}
    >
      <h3 className="text-2xl font-semibold mb-4">Liste des Couleurs</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nom:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              isDarkMode ? "bg-gray-700 text-white" : "text-black"
            } leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Collection:</label>
          <input
            type="text"
            name="collection"
            value={formData.collection}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              isDarkMode ? "bg-gray-700 text-white" : "text-black"
            } leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {isEditing ? "Update" : "Create"} Color
        </button>
      </form>
      <ul className="space-y-4">
        {colors.map((color) => (
          <li
            key={color.id}
            className={`border-b pb-4 ${
              isDarkMode ? "border-gray-600" : "border-gray-200"
            }`}
          >
            <h4 className="text-xl">{color.name}</h4>
            <p>Collection: {color.collection}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(color)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
              >
                Editer
              </button>
              <button
                onClick={() => confirmDelete(color)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {colorToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer la couleur :{" "}
              {colorToDelete.name} ?
            </p>
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

export default ColorsList;
