import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleJoinNow = () => {
    navigate("/signup");
  };

  return (
    <div className="home">
      <nav className="navbar">
        <h2 className="logo">FitTrack</h2>

        <div
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>Home</li>
          <li>Workouts</li>
          <li>Programs</li>
          <li>Contact</li>
        </ul>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <h1>Train Smarter. Get Stronger.</h1>
          <p>
            Track your workouts, monitor progress, and achieve your fitness
            goals with FitTrack.
          </p>
          <button
            onClick={handleJoinNow}
            className="cta">
            Start Your Journey
          </button>
        </div>
      </header>

      <section className="features">
        <h2>Why Choose FitTrack?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Workout Tracking</h3>
            <p>Log exercises, sets, reps, and weight easily.</p>
          </div>

          <div className="feature-card">
            <h3>Progress Analytics</h3>
            <p>Visualize strength gains and performance.</p>
          </div>

          <div className="feature-card">
            <h3>Custom Programs</h3>
            <p>Create workout plans tailored to your goals.</p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/products")}>
            <h3>Our Products</h3>
            <p>Access our premium fitness products for maxmum growth.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Fitness?</h2>
        <button
          onClick={handleJoinNow}
          className="cta">
          Join Now
        </button>
        <p>
          Already a member?{" "}
          <button
            onClick={() => navigate("/login")}
            className="login-link">
            Log in
          </button>
        </p>
      </section>

      <footer className="footer">
        <p>© 2026 FitTrack Gym App</p>
      </footer>
    </div>
  );
}

export default Home;
