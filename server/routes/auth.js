const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../database");

const router = express.Router();
const bcrypt = require("bcrypt");

const authenticate = require("../middleware/auth");

// create table into db if not yet there
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `);
})();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const userExists = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (userExists.rows.length > 0) return res.status(400).json({ error: "Email already in use" });

  // hash the password
  const hashed = await bcrypt.hash(password, 10);

  // save user
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashed]
  );

  const user = result.rows[0];

  // generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  // send httponly JWT in cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000
  });

  res.json({ success: true });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // password check
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 60 * 60 * 1000
  });

  res.json({ success: true });
});

router.post("/logout", (req, res) => {
  res.clearCookie("jwt", {
    sameSite: "none",
    secure: true
  });
  res.sendStatus(204);
});

router.get("/check", authenticate, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

module.exports = router;
