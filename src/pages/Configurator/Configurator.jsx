import DualCarousel from "../../components/Carousel/DualCarousel.jsx";
import { buildRequestOptions } from "../../app/api";
import { useEffect, useState } from "react";
import Nav from "../../components/Carousel/Nav.jsx";
import offRoadConfig from "../../assets/offRoad-config.png";
import Carousel from "../../components/Carousel/Carousel.jsx";
const Configurator = ({ allProducts }) => {
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
      <section className="w-full mx-12 p-6 text-gray-600 body-font font-roboto">
        <div
          className=" bg-gray-100 "
          style={{
            // height: "55vh",
            minWidth: "35vw",
            backgroundImage: `url(${offRoadConfig})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
          }}
        >
          <div className=" bg-gray-800">
            <h1
              className="p-3 text-2xl text-center font-semibold tracking-widest text-white uppercase  bg-gray-800 rounded-t-lg left-1/2 sm:text-3xl"
              style={{ fontFamily: '"Chakra Petch", sans-serif' }}
            >
              CONFIGURATEUR
            </h1>
            <Nav
              bikeCategories={bikeCategories}
              clothingCategories={clothingCategories}
              setSelectedClothingCategory={setSelectedClothingCategory}
              setSelectedBikeCategory={setSelectedBikeCategory}
            />
          </div>
          <div className="flex w-full items-end justify-center  bg-blue-500 text-white p-5">
            <div className=" bg-green-300 p-2 sm:w-8/12">
              <Carousel slides={products[selectedBikeCategory].products} />
            </div>
            <div className="bg-green-300 p-2 sm:w-4/12">
              <Carousel className='' bike={false} slides={products[selectedClothingCategory].products} />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Configurator;
