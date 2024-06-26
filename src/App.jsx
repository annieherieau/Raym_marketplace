import React from "react";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Password from "./pages/Password";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/MyAccount";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect} from "react";
import { isAuthAtom, userAtom } from "./app/atoms";
import EditProduct from "./components/EditProduct";
import ProductPage from "./pages/ProductPage";
import EditComment from "./pages/EditComment";
import OrderPage from "./pages/OrderPage";
import Menu from "./components/NavCircle/Menu/Menu"; // Correction du chemin
import Home from "./pages/Home/Home"; // Ajout de l'importation
import Contacts from "./pages/Contacts/Contacts"; // Correction de l'importation
import NoticeModal from "./components/NoticeModal";
import PrivateRoute from "./components/PrivateRoute";
import LegalMentions from "./pages/LegalMentions";
import Brand from "./pages/Brand/Brand";
import Maintenance from "./pages/Maintenance/Maintenance";
import Configurator from "./pages/Configurator/Configurator";
import { useState } from "react";


const api_url = import.meta.env.VITE_BACK_API_URL;

function App() {
  const isLoggedIn = useAtomValue(isAuthAtom);
  const [products, setProducts] = useState([]);
  // Récupérer les produits depuis l'API
  useEffect(() => {
    fetch(`${api_url}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [isLoggedIn]);
  // Routes pour user connecté
  function wrapPrivateRoute(element, redirect, isAuth) {
    return (
      <PrivateRoute redirect={redirect} isAuth={isAuth}>
        {element}
      </PrivateRoute>
    );
  }

  return (
    <BrowserRouter>
      <Menu /> {/* Utilisation de NavCircle */}
      <NoticeModal />
      <main>
        <Routes>
          {/* ROUTES PUBLIQUES */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home products={products} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/:action" element={<Password />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/legal_mentions" element={<LegalMentions />} />
          <Route path="/configurator" element={<Configurator allProducts={products} />} />

          {/* ROUTES PRIVÉES */}
          <Route
            path="/my_account/*"
            element={wrapPrivateRoute(<MyAccount />, "my_account", isLoggedIn)}
          />
          <Route
            path="/admin/*"
            element={wrapPrivateRoute(<Dashboard />, "admin")}
          />
           <Route
            path="/order/:orderId"
            element={wrapPrivateRoute(<OrderPage />, "my_account")}
          />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route
            path="/products/:productId/comments/:commentId/edit"
            element={<EditComment />}
          />
         
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
