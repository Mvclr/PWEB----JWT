const jwt = require("jsonwebtoken");

class JWTAuth {
  #secretKey;

  constructor(secretKey) {
    this.#secretKey = secretKey;
  }

  getSecretKey() {
    return this.#secretKey;
  }
  setSecretKey(value) {
    this.#secretKey = value;
  }
  generateToken(payload, expiresIn = "1h") {
    return jwt.sign(payload, getSecretKey(), { expiresIn });
  }

  verifyToken(token) {
    return jwt.verify(token, getSecretKey());
  }
}

module.exports = JWTAuth;
