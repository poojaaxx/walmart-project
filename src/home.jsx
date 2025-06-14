import React, { useState } from "react";
import "./App.css";

export default function Home({ cart, setCart }) {
  const [chat, setChat] = useState([]);

  const askAI = async (question) => {
  setChat((prev) => [...prev, { from: "user", text: question }]);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "🤖 Sorry, I had trouble responding.";
    setChat((prev) => [...prev, { from: "ai", text: reply }]);
  } catch (err) {
    setChat((prev) => [...prev, { from: "ai", text: "⚠️ Error: Could not reach AI." }]);
    console.error("AI error:", err);
  }
};


  const replaceItem = (oldItem, newItem) => {
    const updatedCart = cart.map(product =>
      product.item === oldItem
        ? { ...product, item: newItem, status: "custom", icon: "🍎" }
        : product
    );
    setCart(updatedCart);
  };

  return (
    <div className="app">
      <div className="card">
        <header className="header">
          <h1>🛒 Walmart <span className="highlight">PDT</span></h1>
          <p className="subtitle">AI-powered weekly shopping cart</p>
        </header>

        <section className="user-section">
          <h2>👋 Hello, <span className="username">Alex</span>!</h2>
          <p className="welcome-msg">Here's your personalized shopping cart:</p>
        </section>

        <ul className="cart-list">
          {cart.map((product, index) => (
            <li key={index} className={`cart-item ${product.status}`}>
              <span className="icon">{product.icon}</span>
              <div className="item-details">
                <span className="item-name">{product.item}</span>
                <span className="item-qty">{product.qty}</span>
                {product.status === "on sale" && (
                  <span className="sale-badge">🔥 {product.discount} OFF</span>
                )}
              </div>
              <span className={`status-badge ${product.status}`}>{product.status}</span>
            </li>
          ))}
        </ul>

        <section className="chatbox">
          <h3>💬 Ask your AI:</h3>
          <div className="buttons">
            <button onClick={() => askAI("Why did you add bananas?")}>

              🍌 Why bananas?
            </button>
            <button onClick={() => replaceItem("Bananas", "Apples")}>
              🔁 Replace Bananas with Apples
            </button>
          </div>
          <div className="chat-log">
            {chat.map((msg, idx) => (
              <p key={idx} className={`chat-message ${msg.from}`}>
                <strong>{msg.from === "user" ? "🧍 You:" : "🤖 AI:"}</strong> {msg.text}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
