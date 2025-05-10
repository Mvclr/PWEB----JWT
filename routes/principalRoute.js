const express = require("express");
const path = require("path");
const { verifyJWT } = require("../functions/auth.js");
const connection = require("../db/db_server.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.get("/principal", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.get('/api/clients', (req, res) => {
    connection.query('SELECT COUNT(*) AS total_clients FROM clients', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro no DB');
        }
        res.json({ total_clients: result[0].total_clients });
    });
});

router.get('/api/products', (req, res) => {
    connection.query('SELECT COUNT(*) AS total_products FROM products', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro no banco de dados');
        }
        res.json({ total_products: result[0].total_products });
    });
});

module.exports = router;