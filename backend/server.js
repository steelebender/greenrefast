const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const mongo = require("mongoose");
const joi = require("joi");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "refastsql",
});

mongo
  .connect("mongodb://localhost:27017/refastsql", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const userLogSchema = new mongo.Schema({}, { collection: "user_logs" });
const UserLog = mongo.model("UserLog", userLogSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: err.message });
    return res.json(result);
  });
});

app.post("/new_user", (req, res) => {
  const sql =
    "INSERT INTO users (first_name, last_name, dob, gender, email) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.dob,
    req.body.gender,
    req.body.email,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ message: err.message });
    return res.json({ message: "User added successfully" });
  });
});

app.post("/signin_user", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.promise().query(sql, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ success
    return res.json({
      message: "Login successful",
      user: rows[0],
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get("/user_logs", async (req, res) => {
  try {
    const logs = await UserLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/products", (req, res) => {
  const sql = "Select * from products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: err.message });
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
