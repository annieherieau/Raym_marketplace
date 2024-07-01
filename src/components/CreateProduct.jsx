import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { buildRequestOptions } from "../app/api";
import { useAtom, useAtomValue } from "jotai";
import { noticeAtom, userAtom } from "../app/atoms";

const CreateProduct = ({ redirect }) => {
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const user = useAtomValue(userAtom);
  const [, setNotice] = useAtom(noticeAtom);

  useEffect(() => {
    if (!user || !user.token) {
      console.error("Token is not available");
      return;
    }

    const fetchCategories = async () => {
      const { url, options } = buildRequestOptions("categories", "index", {
        token: user.token,
      });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de categories:", error);
      }
    };

    const fetchColors = async () => {
      const { url, options } = buildRequestOptions("colors", "index", {
        token: user.token,
      });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des couleurs:", error);
      }
    };

    fetchCategories();
    fetchColors();
  }, [user]);

  const handleCreateProduct = (newProduct) => {
    setNotice({
      title: "Nouveau Produit",
      message: "Nouveau produit créé avec succès",
    });
    redirect();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-black p-6 rounded shadow">
        <h1
          className="text-palegreen-500 text-5xl text-center mb-4 font-semibold"
          style={{ fontFamily: "Chakra Petch" }}
        >
          Créer un nouveau produit
        </h1>
        <ProductForm
          categories={categories}
          colors={colors}
          onSubmit={handleCreateProduct}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
