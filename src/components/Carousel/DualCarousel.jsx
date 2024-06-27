import { useState } from "react";
import offRoadConfig from "../../assets/offRoad-config.png";

// import "./DualCarrousel.css"; // Import des styles CSS personnalisés
import { buildRequestOptions } from "../../app/api";
import { useEffect } from "react";
import Nav from "./Nav";
import Carousel from "./Carousel";

const DualCarousel = () => {
  const [products, setProducts] = useState(null);
  const [bikeCategories, setBikeCategories] = useState(null);
  const [clothingCategories, setClothingCategories] = useState(null);
  const [selectedBikeCategory, setSelectedBikeCategory] = useState(null);
  const [selectedClothingCategory, setSelectedClothingCategory] =
    useState(null);
  const [cart, setCart] = useState([]);
  const [selectedBikeProduct, setSelectedBikeProduct] = useState(null);
  const [selectedClothingProduct, setSelectedClothingProduct] = useState(null);

  function handleResponse(response) {
    // liste des produits par catégories
    setProducts(response);

    // Catégories bike
    const bikeCats = Object.entries(response)
      .filter((entry) => entry[1].type.bike)
      .map((entry) => entry[0]);
    setBikeCategories(bikeCats);
    setSelectedBikeCategory(bikeCats[0]);

    // Catégories clothing
    const clothingCats = Object.entries(response)
      .filter((entry) => entry[1].type.clothing)
      .map((entry) => entry[0]);
    setClothingCategories(clothingCats);
    setSelectedClothingCategory(clothingCats[0]);
  }

  // Fetching products by catégories
  useEffect(() => {
    if (!products) {
      const { url, options } = buildRequestOptions(null, "configurator");
      fetch(url, options)
        .then((response) => response.json())
        .then((response) => handleResponse(response))
        .catch((err) => console.error(err));
    }
  }, [products]);

  // TODO: ajouter au panier > si connecté sinon alert 'veuillez-vous connecter'
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} ajouté au panier`);
  };


  if (products) {
    return (
      <div className="w-full min-h-[100px] bg-blue-500 text-white p-4">
      Cette div occupe toute la largeur disponible, même si elle est vide.
      <Carousel slides={products[selectedBikeCategory].products} />
    </div>
  
  )
  } else {
    <p>Erreur: pas de produits</p>;
  }
};

export default DualCarousel;
