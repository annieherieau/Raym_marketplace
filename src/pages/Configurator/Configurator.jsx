import { buildRequestOptions } from "../../app/api";
import { useEffect, useState } from "react";
import Nav from "../../components/Carousel/Nav.jsx";
import offRoadConfig from "../../assets/offRoad-config.png";
import Carousel from "../../components/Carousel/Carousel.jsx";
import { useSearchParams } from "react-router-dom";
const Configurator = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("category")
    ? searchParams.get("category").replace("%20", " ")
    : null;
  const [products, setProducts] = useState(null);
  const [bikeCategories, setBikeCategories] = useState(null);
  const [clothingCategories, setClothingCategories] = useState(null);
  const [selectedBikeCategory, setSelectedBikeCategory] = useState(param);
  const [selectedClothingCategory, setSelectedClothingCategory] =
    useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleResponse(response) {
    // liste des produits par catégories
    setProducts(response);

    // Catégories bike
    const bikeCats = Object.entries(response)
      .filter((entry) => entry[1].type.bike)
      .map((entry) => entry[0]);

    setBikeCategories(bikeCats);
    if(!selectedBikeCategory){
      setSelectedBikeCategory(bikeCats[random(bikeCats.length)]);
    }
    // random product
    function random(max){
      return Math.floor(Math.random() * max);
    };
    let defautBikes =
      response[selectedBikeCategory || bikeCats[random(bikeCats.length)]]
        .products;
    let randomBike = defautBikes[random(defautBikes.length)];

    setSelectedProduct(randomBike);
   
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

  const handleProductDetails = (product) => {
    alert(product.name);
    setSelectedProduct(product);
  };

  if (products) {
    return (
        <section className="w-full mx-12 p-6 text-gray-600 body-font font-roboto">
          <div
            className=" bg-gray-100 rounded-3xl min-w-36 bg-cover bg-center"
            style={{
              backgroundImage: `url(${offRoadConfig})`
            }}
          >
            <div className=" bg-black">
              <h1
                className="p-3 text-2xl text-center font-semibold tracking-widest text-white uppercase  bg-black rounded-t-lg left-1/2 sm:text-3xl"
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
            <div className="flex w-full items-end justify-center  text-white p-5">
              <div className="p-2 sm:w-8/12">
                <Carousel
                  products={products[selectedBikeCategory].products}
                  onClick={handleProductDetails}
                  selectedProduct={selectedProduct}
                />
              </div>
              <div className="p-2 sm:w-4/12">
                <Carousel
                  products={products[selectedClothingCategory].products}
                  onClick={handleProductDetails}
                />
              </div>
            </div>
          </div>
        </section>
    );
  }
};

export default Configurator;

