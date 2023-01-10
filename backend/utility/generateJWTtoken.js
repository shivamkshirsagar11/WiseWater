const jwt = require('jsonwebtoken');
exports.generateJWTtoken = (user,collectionName) =>{
    console.log(user + " "+ collectionName)
    return jwt.sign({user,collectionName},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
}