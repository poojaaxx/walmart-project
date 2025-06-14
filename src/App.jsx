import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Login from "./login";

const initialCart = [
  { item: "Milk", qty: "2L", status: "predicted", icon: "🥛" },
  { item: "Eggs", qty: 6, status: "adjusted", icon: "🥚" },
  { item: "Bananas", qty: 6, status: "predicted", icon: "🍌" },
  { item: "Chicken breast", qty: "500g", status: "on sale", discount: "10%", icon: "🍗" }
];

export default function App() {
  const [cart, setCart] = useState(initialCart);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <nav className="bottom-nav">
          <Link to="/">🏠 Home</Link>
          <Link to="/login">🔐 Login</Link>
        </nav>
      </div>
    </Router>
  );
}
