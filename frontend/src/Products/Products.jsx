import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const gohome = () => {
    navigate("/");
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const display_products = (e) => {
    return products.map((product) => (
      <div
        key={product.product_id}
        onClick={() => display_id(product.product_id)}
        className="product-card">
        <img
          src={product.product_image}
          alt={product.product_name}
        />
        <h3>{product.product_name}</h3>
        <p>{product.gender}</p>
        <p>${product.price}</p>
        <button className="cta">Buy Now</button>
      </div>
    ));
  };

  const display_id = (id) => {
    console.log("Clicked product ID:", id);
  };

  return (
    <div className="products">
      {/* Navbar */}
      <nav className="navbar">
        <h2
          className="logo"
          onClick={gohome}>
          FitTrack
        </h2>

        {/* Burger */}
        <div
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li onClick={() => navigate("/")}>Home</li>
          <li>Workouts</li>
          <li>Programs</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Rest stays same */}
      <header className="products-hero">
        <h1>Our Fitness Products</h1>
        <p>Everything you need to level up your fitness journey</p>
      </header>

      <section className="products-section">
        <div className="products-grid">{display_products()}</div>
      </section>

      <section className="cta-section">
        <h2>Ready to Upgrade Your Fitness?</h2>
        <button
          onClick={() => navigate("/signup")}
          className="cta">
          Join Now
        </button>
      </section>

      <footer className="footer">
        <p>© 2026 FitTrack Gym App</p>
      </footer>
    </div>
  );
};

export default Products;
