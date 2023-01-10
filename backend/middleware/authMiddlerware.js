const asyncHandler = require('express-async-handler');
const { decodeJWTtoken } = require('../utility/decodeJWTtoken');

const protect = asyncHandler(async (req, res, next) => {
    const decoded = decodeJWTtoken(req, res);

    try {
        req.user = decoded.user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('not authorized');
    }
});

module.exports = { protect };