const express = require("express");
const path = require("path");
const { verifyJWT } = require("../functions/auth.js");
const connection = require("../db/db_server.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/clientes", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "clientes.html"));
});
router.get("/api/clientsTable", (req, res) => {
  connection.query("SELECT * FROM clients", (err, results) => {
    if (err) {
      console.error("Error fetching clients:", err);
      return res.status(500).json({ message: "Erro ao buscar clientes" });
    }
    res.json(results);
  });
});

router.post("/clientes", (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO clients (name) VALUES (?)";
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error("Erro ao adicionar cliente:", err);
      return res.status(500).json({ message: "Erro ao adicionar cliente" });
    }
    res.redirect("/clientes");
  });
});

router.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM clients WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro deletando cliente:", err);
      return res.status(500).json({ message: "Erro ao deletar cliente" });
    } 
  });
  res.redirect("/clientes");
});

// router.put("/clientes/:id", (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const query = "UPDATE clients SET name = ? WHERE id = ?";
//   connection.query(query, [name, id], (err, results) => {
//     if (err) {
//       console.error("Error updating client:", err);
//       return res.status(500).json({ message: "Erro ao atualizar cliente" });
//     }
//     res.json(results);
//   });
//   res.redirect("/clientes");
// })
module.exports = router;