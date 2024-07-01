import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { buildRequestOptions } from "../app/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { url, options } = buildRequestOptions("products", "show", { id });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Réponse réseau incorrecte");
        }
        // Convertir le prix en nombre
        data.price = Number(data.price);
        setProduct(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        setError(
          "Erreur lors de la récupération du produit. Veuillez réessayer plus tard."
        );
      }
    };

    const fetchCategories = async () => {
      console.log("Fetching categories...");
      const { url, options } = buildRequestOptions("categories", "index", {});
      console.log("API URL:", url);
      console.log("Options:", options);
      try {
        const response = await fetch(url, options);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de categories:", error);
      }
    };

    const fetchColors = async () => {
      console.log("Fetching colors...");
      const { url, options } = buildRequestOptions("colors", "index", {});
      console.log("API URL:", url);
      console.log("Options:", options);
      try {
        const response = await fetch(url, options);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Couleurs récupérées:", data);
        setColors(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des couleurs:", error);
      }
    };

    fetchProduct();
    fetchCategories();
    fetchColors();
  }, [id]);

  const handleUpdateProduct = (updatedProduct) => {
    navigate("/admin"); // Redirige vers le dashboard admin après la mise à jour
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      {product && (
        <ProductForm
          product={product}
          categories={categories}
          colors={colors}
          onSubmit={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default EditProduct;
