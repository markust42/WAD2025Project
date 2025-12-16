const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const postsRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const authenticate = require("./middleware/auth");

const app = express();


app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", authenticate, postsRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/auth/check", (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});