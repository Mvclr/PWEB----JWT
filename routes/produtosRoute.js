const express = require("express");
const path = require("path");
const { verifyJWT } = require("../functions/auth.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/produtos", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "produtos.html"));
});

module.exports = router;