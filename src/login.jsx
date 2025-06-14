import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login feature coming soon!");
  };

  return (
    <div className="app">
      <div className="card">
        <h2>🔐 Login</h2>
        <p>Login functionality coming soon!</p>

        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}
