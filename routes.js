const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { verifyJWT, secretKey } = require("./functions/auth.js");
const bcrypt = require('bcrypt')
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "public")));
router.use(cookieParser());
let users = []

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
  console.log(users)
});
router.post("/login", async (req, res) => {
        const { user, password } = req.body;
        const foundUser = users.find(u => u.user === user);
        
        if (!foundUser) {
          return res.status(401).json({ message: "Usuário não encontrado" });
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if(!passwordMatch) {
            return res.status(401).json({ message: "Senha incorreta" });
        }else{
        
        const token = jwt.sign({ user: foundUser.user }, secretKey, { expiresIn: 30000 });
        res.cookie("token", token, { httpOnly: true, maxAge: 30000000 });
        console.log("Token gerado: " + token);
        return res.sendFile(path.join(__dirname, "views", "principal.html"));
        }
      
});
router.get("/principal", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "principal.html"));
});
router.get("/clientes", verifyJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "clientes.html"));
});
router.get("/cadastro", (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
    console.log(users)
})
router.post("/cadastro", async (req, res) => {
    const { name, user, password } = req.body;
    const userVerify = users.find(u => u.user === user)
    if(userVerify){
        return res.status(401).json({message: "Usuário já cadastrado, tente outro nome de usuário"})
    }
    const senhaCrypt = await bcrypt.hash(password, 10)
    users.push({name, user, password: senhaCrypt})
    res.status(201).json({message:"Usuário cadastrado com sucesso"})
    
  });
router.get('/produtos', (req,res)=>{
  res.sendFile(path.join(__dirname, 'views', 'produtos.html'))
})

// pra confirmar que o cookie ta sendo armazenado sem testes diretos do codigo, inspeciona a página no navegador e vai em aplicativo -> cookies -> localhost:3000 (ou qualquer que seja a porta se o senhor mudar aí), um teste que eu fiz aqui foi, ir lá e editar o valor do token porque ele permite, pra verificar se mudaria serverside, mas ta funcionando diretinho e ele ja redireciona pro /login

module.exports = router;
