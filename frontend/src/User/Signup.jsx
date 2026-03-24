import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Signin from "./Signin";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    email: "",
  });

  const submitForm = (e) => {
    e.preventDefault();

    fetch("http://localhost:5001/new_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert(data.message); // Show success message
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while signing up. Please try again."); // Show error message
      });

    console.log(user);
    setUser({
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      email: "",
    });
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(name, value); // <-- check each input change
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Your Account</h2>
        <p>Join FitTrack and start your fitness journey today.</p>

        <form
          className="signup-form"
          onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder=" "
              required
              value={user.first_name}
              onChange={handleChange}
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder=" "
              required
              value={user.last_name}
              onChange={handleChange}
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="form-group">
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder=" "
              required
              value={user.dob}
              onChange={handleChange}
            />
            <label htmlFor="dob">Date of Birth</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder=" "
              required
              value={user.gender}
              onChange={handleChange}
            />
            <label htmlFor="gender">Gender</label>
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
