const express = require("express");
const pool = require("../database");

const router = express.Router();

(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posttable (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      urllink VARCHAR(255)
    )
  `);
})();

router.post("/", async (req, res) => {
  const { title, body, urllink } = req.body;
  const result = await pool.query(
    "INSERT INTO posttable (title, body, urllink) VALUES ($1,$2,$3) RETURNING *",
    [title, body, urllink]
  );
  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM posttable ORDER BY id DESC"
  );
  res.json(result.rows);
});

router.get("/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM posttable WHERE id=$1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
  const { title, body, urllink } = req.body;
  await pool.query(
    "UPDATE posttable SET title=$1, body=$2, urllink=$3 WHERE id=$4",
    [title, body, urllink, req.params.id]
  );
  res.json({ updated: true });
});

router.delete("/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM posttable WHERE id=$1",
    [req.params.id]
  );
  res.json({ deleted: true });
});

module.exports = router;
