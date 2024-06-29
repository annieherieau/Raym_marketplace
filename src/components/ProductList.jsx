import { useState, useEffect } from "react";
import Product from "./Product";
import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";

const ProductList = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      const { url, options } = buildRequestOptions(null, 'admin_check', { token: user.token });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to check admin status");
        }

        const data = await response.json();
        setIsAdmin(data.admin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, [isLoggedIn, user.token]);

  useEffect(() => {
    const { url, options } = buildRequestOptions("products", "index", {
      token: user.token,
    });
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const productsWithNumericPrice = data.map(product => ({
          ...product,
          price: parseFloat(product.price)
        }));
        setProducts(productsWithNumericPrice);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      });
  }, [user.token]);

  useEffect(() => {
    const fetchCategoriesAndColors = async () => {
      try {
        const { url: categoriesUrl, options: categoriesOptions } = buildRequestOptions("categories", "index", { token: user.token });
        const { url: colorsUrl, options: colorsOptions } = buildRequestOptions("colors", "index", { token: user.token });

        const [categoriesResponse, colorsResponse] = await Promise.all([
          fetch(categoriesUrl, categoriesOptions),
          fetch(colorsUrl, colorsOptions)
        ]);

        if (!categoriesResponse.ok || !colorsResponse.ok) {
          throw new Error("Failed to fetch categories or colors");
        }

        const categoriesData = await categoriesResponse.json();
        const colorsData = await colorsResponse.json();
        setCategories(categoriesData);
        setColors(colorsData);
      } catch (error) {
        console.error("Error fetching categories or colors:", error);
      }
    };

    fetchCategoriesAndColors();
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
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { url, options } = buildRequestOptions("products", "update", {
      id,
      body: updatedProduct,
      token: user.token,
    });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedProductData = await response.json();
      setProducts(
        products.map((product) =>
          product.id === id ? updatedProductData : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again later.");
    }
  };

  const handleDeleteProduct = async (id) => {
    const { url, options } = buildRequestOptions("products", "delete", {
      id,
      token: user.token,
    });
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product. Please try again later.");
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <section className="text-gray-600 body-font mr-8 ml-8 mb-8" style={{ borderRadius: '20px' }}>
      <div className="w-full bg-black px-8 py-10 mx-auto flex flex-wrap">
        <div className="flex w-full mb-10 flex-wrap">
          <h1 className="sm:text-4xl text-3xl font-bold title-font text-palegreen-500 lg:w-1/3 lg:mb-0">Nos best sellers :</h1>
        </div>
        <div className="flex w-full mb-8">
          <div className="mr-4">
            <label htmlFor="category" className="mr-2 text-white">Trier par catégorie :</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="p-2 border rounded">
              <option value="all">Toutes</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="mr-4">
            <label htmlFor="color" className="mr-2 text-white">Trier par couleur :</label>
            <select id="color" value={selectedColor} onChange={handleColorChange} className="p-2 border rounded">
              <option value="all">Toutes</option>
              {colors.map(color => (
                <option key={color.id} value={color.collection}>{color.collection}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="mr-2 text-white">Trier par prix:</label>
            <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className="p-2 border rounded pr-8">
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1" style={{ borderRadius: '20px' }}>
          <div className="flex flex-wrap w-1/2">
            {sortedProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="md:p-2 p-1 w-1/2 bg-white border border-black" style={{ borderWidth: '8px', borderRadius: '20px' }}>
                <Product
                  product={product}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap w-1/2">
            {sortedProducts.slice(3, 6).map((product) => (
              <div key={product.id} className="md:p-2 p-1 w-1/2 bg-white border border-black" style={{ borderWidth: '8px', borderRadius: '20px' }}>
                <Product
                  product={product}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
