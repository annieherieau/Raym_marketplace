import { useState } from "react";
import Slider from "react-slick";
import offRoadConfig from "../../assets/offRoad-config.png";
// import veloIcon from "../../assets/veloIcon.png";
// import tshirtIcon from "../../assets/tshirtIcon.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css"; // Import des styles CSS personnalisés
import { buildRequestOptions } from "../../app/api";
import { useEffect } from "react";
// import CategoryButton from "./CategoryButton";
import Nav from "./Nav";

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    customPaging: () => (
      <div
        style={{
          width: "30px",
          height: "10px",
          borderRadius: "5px",
          background: "rgba(255, 255, 255, 0.75)",
        }}
      />
    ),
    afterChange: (current) => {
      if (selectedBikeCategory) {
        setSelectedBikeProduct(products[selectedBikeCategory][current]);
      }
      if (selectedClothingCategory) {
        setSelectedClothingProduct(products[selectedClothingCategory][current]);
      }
    },
  };

  if (products) {
    return (
      <div
        className="relative m-6 overflow-hidden text-gray-800 bg-gray-100 shadow-lg sm:m-12"
        style={{
          height: "65vh",
          backgroundImage: `url(${offRoadConfig})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "20px",
        }}
      >
        {/* TITLE + NAV */}
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
        {/* fin TITLE + NAV */}
        {/* Carousels */}
        {/* <div className="flex h-full"> */}
          <div className="flex items-center w-full p-6 sm:p-12 bg-custom-image overflow-x-hidden">
            <div className="flex flex-row items-end justify-center h-full space-x-4">
              {/*  carrousel BIKE */}
              <div className=" md:mr-6 lg:mr-6 sm:w-4/12 sm:mr-4">
                {selectedBikeCategory && (
                  <>
                    <Slider {...sliderSettings}>
                      {products[selectedBikeCategory].products.map(
                        (product) => (
                          <div
                            key={product.id}
                            className="flex flex-col justify-center"
                          >
                            <div className="flex flex-row justify-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-auto max-w-full rounded-lg sm:max-h-80"
                              />
                            </div>
                            <div className="mt-3 text-center">
                              <h3 className="text-base font-semibold text-white sm:text-lg">
                                {product.name}
                              </h3>
                              <p className="text-white">{product.price} €</p>
                            </div>
                          </div>
                        )
                      )}
                    </Slider>
                    {selectedBikeProduct && (
                      <div className="flex flex-col justify-center">
                        <button
                          className="px-3 py-1 mt-2 text-white bg-blue-500 rounded-sm sm:rounded"
                          onClick={() => handleAddToCart(selectedBikeProduct)}
                        >
                          Ajouter {selectedBikeProduct.name} au panier
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* fin  carrousel BIKE */}
              {/* carrousel VETEMENTS */}
              <div className=" md:mr-6 lg:mr-6 sm:w-4/12 sm:mr-4">
                {selectedClothingCategory && (
                  <>
                    <Slider {...sliderSettings}>
                      {products[selectedClothingCategory].products.map(
                        (product) => (
                          <div
                            key={product.id}
                            className="flex flex-col justify-center"
                          >
                            <div className="flex flex-row justify-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-auto max-w-full rounded-lg sm:max-h-80"
                              />
                            </div>
                            <div className="mt-3 text-center">
                              <h3 className="text-base font-semibold text-white sm:text-lg">
                                {product.name}
                              </h3>
                              <p className="text-white">{product.price} €</p>
                            </div>
                          </div>
                        )
                      )}
                    </Slider>
                    {selectedClothingProduct && (
                      <div className="flex flex-col justify-center">
                        <button
                          className="px-3 py-1 mt-2 text-white bg-blue-500 rounded-sm sm:rounded"
                          onClick={() =>
                            handleAddToCart(selectedClothingProduct)
                          }
                        >
                          Ajouter {selectedClothingProduct.name} au panier
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* fin carrousel VETEMENTS */}
            </div>
          </div>
        {/* </div> */}
      </div>
    );
  } else {
    <p>Erreur: pas de produits</p>;
  }

  function newFunction() {}
};

export default DualCarousel;
