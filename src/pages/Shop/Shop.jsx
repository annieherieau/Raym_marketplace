import { useState, useEffect } from "react";
import Product from "../../components/Product";
import { buildRequestOptions } from "../../app/api";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../../app/atoms";

const Shop = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupération du mode sombre depuis le localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    const fetchProducts = async () => {
      const { url, options } = buildRequestOptions("products", "index", {
        token: user.token,
      });
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const productsWithNumericPrice = data.map(product => ({
          ...product,
          price: parseFloat(product.price)
        }));
        setProducts(productsWithNumericPrice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      const { url, options } = buildRequestOptions("categories", "index", {
        token: user.token,
      });
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchColors = async () => {
      const { url, options } = buildRequestOptions("colors", "index", {
        token: user.token,
      });
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setColors(data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchProducts();
    fetchCategories();
    fetchColors();
  }, [user.token]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    return (selectedCategory === "all" || product.category.name === selectedCategory) &&
           (selectedColor === "all" || product.color.collection === selectedColor);
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={`container mx-auto px-8 bg-black text-white rounded-[20px] overflow-hidden`}>
      <div className="flex justify-between items-center my-16">
        <h1 className={`sm:text-4xl text-3xl font-bold title-font ${isDarkMode ? 'text-green-400' : 'text-palegreen-500'} lg:w-1/3 lg:mb-0`}>Boutique</h1>
        <div className="flex items-center">
          <div className="mr-4">
            <label htmlFor="category" className="mr-2">Trier par catégorie:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange} className={`p-2 border rounded bg-gray-800 text-white`}>
              <option value="all">Toutes</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mr-4">
            <label htmlFor="color" className="mr-2">Trier par couleur:</label>
            <select id="color" value={selectedColor} onChange={handleColorChange} className={`p-2 border rounded bg-gray-800 text-white`}>
              <option value="all">Toutes</option>
              {colors.map(color => (
                <option key={color.id} value={color.collection}>{color.collection}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="mr-2">Trier par prix:</label>
            <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className={`p-2 border rounded pr-8 bg-gray-800 text-white`}>
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -m-2 mb-8">
        {sortedProducts.map(product => (
          <div key={product.id} className="p-2 md:w-1/3">
            <Product
              product={product}
              isAdmin={false} 
              onUpdateProduct={null}
              onDeleteProduct={null}
              isDarkMode={isDarkMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
