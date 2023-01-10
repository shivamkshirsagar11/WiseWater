const asyncHandler = require('express-async-handler');
// const { mapCollectionName } = require('../utility/mappingCollection');
const { decodeJWTtoken } = require('../utility/decodeJWTtoken');

const protect = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    console.log('from authMiddleware');
    const decoded = decodeJWTtoken(req, res);

    try {
        // const collection = mapCollectionName(decoded.collectionName);
        // req.user = await collection.findById(decoded.id).select('-password');
        req.user = decoded.user;

        console.log('from auth middlewear',req.user)
        console.log('from protect is done');
        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('not authorized');
    }
});

module.exports = { protect };