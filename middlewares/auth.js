const secretKey = process.env.JWT_SECRET || 'MySecret'
const jwt = require('jsonwebtoken')
function verifyJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login')
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.redirect('/login')
        }
        req.user = decoded;
        next()
    });
}

module.exports = { verifyJWT, secretKey };