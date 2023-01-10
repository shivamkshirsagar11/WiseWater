const jwt = require('jsonwebtoken');

exports.generateJWTtoken = (user, collectionName) => {
    return jwt.sign({ user, collectionName }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}