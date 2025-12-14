const express = require("express");
const cors = require("cors");

const postsRoutes = require("./routes/posts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});