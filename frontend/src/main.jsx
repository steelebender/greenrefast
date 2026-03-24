import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./User/signup.jsx";
import Signin from "./User/Signin.jsx";
import Products from "./Products/Products.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element={<Signin />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
