// src/App.jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Password from "./pages/Password";
import NotFound from "./pages/NotFound";
import UserSettings from "./pages/UserSettings";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { unknownUser, userAtom } from "./app/atoms";
import { loadCookie } from "./app/utils";

import Cart from "./components/Cart";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ProductPage from "./pages/ProductPage";
import EditComment from "./pages/EditComment";
import CommentForm from "./components/CommentForm";
import OrderPage from "./pages/OrderPage";

const api_url = import.meta.env.VITE_BACK_API_URL;

function App() {
  const [, setUser] = useAtom(userAtom);
  useEffect(() => {
    setUser(loadCookie() ? loadCookie() : unknownUser);
  }, [setUser]);

  // Récupérer les produits depuis l'API
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main>
        {/* <CartProvider> */}
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home products={products} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/:action" element={<Password />} />
            <Route path="/user_settings" element={<UserSettings />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Dashboard />}/>
            <Route path="/products/new" element={<CreateProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/product/:productId" element={<ProductPage/>} />
            <Route path="/products/:productId/comments/:commentId/edit" element={<EditComment />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
          </Routes>
        {/* </CartProvider> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
