const connection = require('../db/db_server.js');
function userVerify(user){
    const userVerify = connection.query(
    "SELECT * FROM user WHERE username = ?",
    [user],
    (error, results) => {
      if (error) {
        console.error("Error checking user:", error);
        return res.status(500).json({ message: "Erro ao verificar usuário" });
      }
      return results.length > 0;
    }
);}

module.exports = userVerify;