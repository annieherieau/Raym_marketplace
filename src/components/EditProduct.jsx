import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import { buildRequestOptions } from "../app/api";
import { useAtom } from "jotai";
import { noticeAtom } from "../app/atoms";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);
  const [, setNotice] = useAtom(noticeAtom);

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
    setNotice({
      title: "Modifier un Produit",
      message: "Produit modifié avec succès",
    });
    navigate(`/admin?product=${updatedProduct.id}`)
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-black p-6 rounded shadow">
        <h1
          className="text-palegreen-500 text-5xl text-center mb-4 font-semibold"
          style={{ fontFamily: "Chakra Petch" }}
        >
          Modifier un produit
        </h1>
      {product && (
        <ProductForm
          product={product}
          categories={categories}
          colors={colors}
          onSubmit={handleUpdateProduct}
        />
      )}
    </div>
    </div>
  );
};

export default EditProduct;
