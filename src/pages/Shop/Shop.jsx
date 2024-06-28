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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

    fetchProducts();
    fetchCategories();
  }, [user.token]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category.name === selectedCategory);

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
    <div className="container mx-auto px-8 bg-white rounded-[20px] overflow-hidden">
      <div className="flex justify-between items-center my-16">
        <h1 className="text-3xl font-bold">Boutique</h1>
        <div className="flex items-center">
          <div className="mr-4">
            <label htmlFor="category" className="mr-2">Trier par catégorie:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="p-2 border rounded">
              <option value="all">Toutes</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="mr-2">Trier par prix:</label>
            <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className="p-2 border rounded">
              <option value="asc">Croissant</option>
              <option value="desc">Décroissant</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -m-4">
        {sortedProducts.map(product => (
          <div key={product.id} className="p-4 md:w-1/3">
            <Product
              product={product}
              isAdmin={false} 
              onUpdateProduct={null}
              onDeleteProduct={null}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
