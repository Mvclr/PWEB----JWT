const express = require("express");
const loginRoutes = require("./routes/loginRoute");
const principalRoutes = require("./routes/principalRoute");
const clientesRoutes = require("./routes/clientesRoute");
const cadastroRoutes = require("./routes/cadastroRoute");
const produtosRoutes = require("./routes/produtosRoute");

const router = express.Router();

router.use(loginRoutes);
router.use(principalRoutes);
router.use(clientesRoutes);
router.use(cadastroRoutes);
router.use(produtosRoutes);


module.exports = router;
