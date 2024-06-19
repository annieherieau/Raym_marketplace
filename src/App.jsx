// src/App.jsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Password from "./pages/Password";
import NotFound from "./pages/NotFound";
import UserSettings from "./pages/UserSettings";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { unknownUser, userAtom } from "./app/atoms";
import { loadCookie } from "./app/utils";
// import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";

const basename = import.meta.env.VITE_BASENAME;
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
    <BrowserRouter basename={basename}>
      <Header />
      <main>
        {/* <CartProvider> */}
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/:action" element={<Password />} />
            <Route path="/user_settings" element={<UserSettings />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        {/* </CartProvider> */}
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
