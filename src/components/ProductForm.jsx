import { useState } from "react";
import PropTypes from "prop-types";
import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom } from "../app/atoms";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ product, categories, colors, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    description: product ? product.description : "",
    long_description: product ? product.long_description : "",
    price: product ? product.price : "", // Laisse comme string ici
    category: product ? product.category_id : "", // Nouveau champ pour la catégorie
    color: product ? product.color_id : "", // Nouveau champ pour la couleur
    photo: null, // Nouveau champ pour le fichier photo
  });
  const { token } = useAtomValue(userAtom);
  const navigate =useNavigate()

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

    const endpoint = product ? "update" : "create";
    const dataToSubmit = new FormData();
    dataToSubmit.append("product[name]", formData.name);
    dataToSubmit.append("product[description]", formData.description);
    dataToSubmit.append("product[long_description]", formData.long_description);
    dataToSubmit.append("product[price]", Number(formData.price));
    dataToSubmit.append("product[category_id]", formData.category); // Ajoute la catégorie
    dataToSubmit.append("product[color_id]", formData.color); // Ajoute la couleur
    if (formData.photo) {
      dataToSubmit.append("product[photo]", formData.photo);
    }

    const { url, options } = buildRequestOptions("products", endpoint, {
      id: product ? product.id : undefined,
      token: token,
      body: dataToSubmit,
      isFormData: true,
    });

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Réponse réseau incorrecte");
      }
      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-black shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Nom:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Description Courte:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Description Longue:
        </label>
        <textarea
          name="long_description"
          value={formData.long_description}
          onChange={handleChange}
          className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Prix:
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Catégorie:
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Couleur:
        </label>
        <select
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selectionner une couleur</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-100 text-sm font-bold mb-2">
          Photo:
        </label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {product ? "Modifier" : "Créer"} le Produit
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
    category_id: PropTypes.number, // Ajout de la prop category
    color_id: PropTypes.number, // Ajout de la prop color
    photo: PropTypes.object, // Ajout de la prop photo
  }),
  categories: PropTypes.array.isRequired, // Ajout des catégories
  colors: PropTypes.array.isRequired, // Ajout des couleurs
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
