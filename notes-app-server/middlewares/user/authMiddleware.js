const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/Jwt') || 'supersecretkey'

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
