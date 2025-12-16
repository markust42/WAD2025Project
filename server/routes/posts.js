const express = require("express");
const pool = require("../database");

const router = express.Router();

(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posttable (
      id SERIAL PRIMARY KEY,
      body TEXT NOT NULL,
      modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
})();

router.post("/", async (req, res) => {
  const { body } = req.body;
  const result = await pool.query(
    "INSERT INTO posttable (body) VALUES ($1) RETURNING *",
    [body]
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
  const { body } = req.body;
  await pool.query(
    "UPDATE posttable SET body=$1 WHERE id=$2",
    [body, req.params.id]
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

router.delete("/", async(req, res) => {
  await pool.query(
    "DELETE FROM posttable"
  );
  res.json({ updated: true});
});

module.exports = router;
