const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const joi = require("joi");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "refastsql",
});

mongoose
  .connect("mongodb://localhost:27017/test", {})
  .then(() => console.log("MOngoDB is Connected!"))
  .catch((err) => console.error("Connection error:", err));

const port = process.env.PORT || 5001;

// Routes

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the refastsql!" });
});

app.get("/users", (req, res) => {
  const mysql = "SELECT * FROM users";
  db.query(mysql, (err, result) => {
    if (err) return res.json({ message: "Error fetching users" });
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
