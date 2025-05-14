const express = require("express");
const path = require("path");
const { verifyJWT } = require("../functions/auth.js");
const connection = require("../db/db_server.js");
const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/produtos", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "produtos.html"));
});
router.get("/api/produtosTable", (req, res) => {
  connection.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Erro buscando produtos:", err);
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }
    res.json(results);
  });
});

router.post("/produtos", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO products (name) VALUES (?)";
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error("Erro ao adicionar produtos:", err);
      return res.status(500).json({ message: "Erro ao adicionar produtos" });
    }
    res.redirect("/produtos");
  });
});

router.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro deletando produtos:", err);
      return res.status(500).json({ message: "Erro ao deletar produtos" });
    } 
  });
  res.redirect("/produtos");
});
module.exports = router;
