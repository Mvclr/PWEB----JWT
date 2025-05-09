const express = require("express");
const path = require("path");
const { verifyJWT } = require("../functions/auth.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.get("/principal", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

module.exports = router;