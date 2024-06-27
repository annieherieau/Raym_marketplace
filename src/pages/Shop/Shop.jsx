import { useState, useEffect } from "react";
import { buildRequestOptions } from "../../app/api";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../../app/atoms";
import Product from "../../components/Product";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Shop = () => {
  const user = useAtomValue(userAtom);
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:3000/admin_check", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

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
    const fetchProducts = async () => {
      try {
        const { url, options } = buildRequestOptions("products", "index", {
          token: user.token,
        });
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.token]);

  // Function to filter products by category
  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category.name === category);
  };

  // Handle update product function
  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const { url, options } = buildRequestOptions("products", "update", {
        id,
        body: updatedProduct,
        token: user.token,
      });
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedProductData = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProductData : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error updating product. Please try again later.");
    }
  };

  // Handle delete product function
  const handleDeleteProduct = async (id) => {
    try {
      const { url, options } = buildRequestOptions("products", "delete", {
        id,
        token: user.token,
      });
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
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
    <section className="bg-gray-900 text-gray-100 body-font rounded-[40px]">
      <div className="container px-5 py-24 mx-auto">
        <Tabs>
          <TabList>
            <Tab>Nos Vélos</Tab>
            <Tab>Nos Tenues</Tab>
            <Tab>Nos Accessoires</Tab>
          </TabList>

          <TabPanel>
            <div className="flex flex-wrap -m-4">
              {/* On Road Products */}
              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  On Road
                </h2>
                {filterProductsByCategory("On Road").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>

              {/* Off Road Products */}
              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Off Road
                </h2>
                {filterProductsByCategory("Off Road").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>

              {/* Hybrid Products */}
              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Hybrid
                </h2>
                {filterProductsByCategory("Hybrid").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            {/* Tenue Products */}
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Tenue Homme
                </h2>
                {filterProductsByCategory("Homme").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>

              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Tenue Femme
                </h2>
                {filterProductsByCategory("Femme").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            {/* Accessories Products */}
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Accessory 1
                </h2>
                {filterProductsByCategory("Accessory 1").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>

              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Accessory 2
                </h2>
                {filterProductsByCategory("Accessory 2").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>

              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <h2 className="tracking-widest text-2xl title-font font-medium mb-4">
                  Accessory 3
                </h2>
                {filterProductsByCategory("Accessory 3").map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    isAdmin={isAdmin}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default Shop;
