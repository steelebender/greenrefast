import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signin = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
  });

  const submitForm = (e) => {
    e.preventDefault();

    fetch("http://localhost:5001/signin_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        if (data.user) {
          alert("Sign in successful!");
          navigate("/");
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while signing in. Please try again.");
      });

    setUser({ email: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Welcome Back</h2>
        <p>Sign in to continue your fitness journey.</p>

        <form
          className="signup-form"
          onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              required
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>

          <button
            type="submit"
            className="signup-btn">
            Sign In
          </button>
        </form>

        <p className="login-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
