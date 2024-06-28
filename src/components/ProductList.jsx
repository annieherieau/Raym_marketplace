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
            Authorization: `Bearer ${user.token}`, // Utiliser le token de l'utilisateur
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
        // Convertir le prix en nombre
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
    <>
      <section className="text-gray-600 body-font mr-8 ml-8 mb-8" style={{ borderRadius: '20px' }}>
        <div className="w-full bg-black px-8 py-10 mx-auto flex flex-wrap">
          <div className="flex w-full mb-10 flex-wrap">
            <h1 className="sm:text-4xl text-3xl font-bold title-font text-palegreen-500 lg:w-1/3 lg:mb-0">Nos best sellers :</h1>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1" style={{ borderRadius: '20px' }}>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2 bg-white">
                {products[0] && (
                  <Product
                    product={products.sort((a, b) => b.rating - a.rating)[0]}
                    isAdmin={isAdmin}
                    onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                    onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                  />
                )}
              </div>
              <div className="md:p-2 p-1 w-1/2 bg-white">
                {products[1] && (
                  <Product
                    product={products.sort((a, b) => b.rating - a.rating)[1]}
                    isAdmin={isAdmin}
                    onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                    onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                  />
                )}
              </div>
              <div className="md:p-2 p-1 w-full bg-white">
                {products[2] && (
                  <Product
                    product={products.sort((a, b) => b.rating - a.rating)[2]}
                    isAdmin={isAdmin}
                    onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                    onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full bg-white">
                {products[3] && (
                  <Product
                    product={products.sort((a, b) => b.rating - a.rating)[3]}
                    isAdmin={isAdmin}
                    onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                    onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                  />
                )}
              </div>
              <div className="md:p-2 p-1 w-1/2 bg-white">
                {products[4] && (
                  <Product
                    product={products.sort((a, b) => b.rating - a.rating)[4]}
                    isAdmin={isAdmin}
                    onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                    onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                  />
                )}
              </div>
              <div className="md:p-2 p-1 w-1/2 bg-white">
                {products[5] && (
                  <Product
                    product={products.sort((a, b) => b.rating - a.rating)[5]}
                    isAdmin={isAdmin}
                    onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                    onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>  
    </>
  );
};

export default ProductList;



