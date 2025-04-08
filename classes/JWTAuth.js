const jwt = require('jsonwebtoken');

class JWTAuth {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    generateToken(payload, expiresIn = '1h') {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    verifyToken(token) {
        return jwt.verify(token, this.secretKey);
    }
}

module.exports = JWTAuth;