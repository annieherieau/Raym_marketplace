import { useState, useEffect } from "react";
import Product from "./Product";
import { buildRequestOptions } from "../app/api";
import { useAtomValue } from "jotai";
import { userAtom, isAuthAtom } from "../app/atoms";
import onRoadRobenaImage from '/src/assets/OnRoad-Robena.png';

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
      .then((data) => setProducts(data))
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
    return <div>Loading...</div>; // Afficher un message de chargement pendant la vérification du statut admin
  }

  if (error) {
    return <div>{error}</div>;
  }



  
  return (
    <section className="text-gray-600 body-font bg-white mx-8 rounded-[20px] mb-12">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">Nos Best Seller</h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom.</p>
        </div>
        
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            {products[0] && (
              <div className="md:p-2 p-1 w-1/2">
                <Product
                  key={products[0].id}
                  product={{ ...products[0], price: Number(products[0].price), image: onRoadRobenaImage }}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            )}

            {products[1] && (
              <div className="md:p-2 p-1 w-1/2">
                <Product
                  key={products[1].id}
                  product={{ ...products[1], price: Number(products[1].price), image: onRoadRobenaImage }}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            )}

            {products[2] && (
              <div className="md:p-2 p-1 w-full">
                <Product
                  key={products[2].id}
                  product={{ ...products[2], price: Number(products[2].price), image: onRoadRobenaImage }}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap w-1/2">
            {products[3] && (
              <div className="md:p-2 p-1 w-full">
                <Product
                  key={products[3].id}
                  product={{ ...products[3], price: Number(products[3].price), image: onRoadRobenaImage }}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            )}

            {products[4] && (
              <div className="md:p-2 p-1 w-1/2">
                <Product
                  key={products[4].id}
                  product={{ ...products[4], price: Number(products[4].price), image: onRoadRobenaImage }}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            )}
            
            {products[5] && (
              <div className="md:p-2 p-1 w-1/2">
                <Product
                  key={products[5].id}
                  product={{ ...products[5], price: Number(products[5].price), image: onRoadRobenaImage }}
                  isAdmin={isAdmin}
                  onUpdateProduct={isAdmin ? handleUpdateProduct : null}
                  onDeleteProduct={isAdmin ? handleDeleteProduct : null}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
 
 

export default ProductList;






