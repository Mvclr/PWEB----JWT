const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtAuth } = require("../functions/auth.js");
const connection = require("../db/db_server.js");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

router.post("/login", async (req, res) => {
  const { user, password } = req.body;
  const foundUser = await new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [user],
      (error, results) => {
        if (error) {
          console.error("Error checking user:", error);
          reject(res.status(500).json({ message: "Erro ao verificar usuário" }));
        } else {
          resolve(results[0]); // Return the first user object if found
        }
      }
    );
  });

  if (!foundUser) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ user: foundUser.username }, jwtAuth.getSecretKey(), {
    expiresIn: 30000,
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 30000000 });
  return res.sendFile(path.join(__dirname, "../views", "principal.html"));
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;