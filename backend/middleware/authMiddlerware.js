import asyncHandler from 'express-async-handler';
import { decodeJWTtoken } from '../utility/decodeJWTtoken.js';
import { mapCollectionName } from '../utility/mappingCollection.js';

const protect = asyncHandler(async (req, res, next) => {
    const { _id, collectionName } = decodeJWTtoken(req, res);
    const collection = mapCollectionName(collectionName);
    try {
        req.userid = await collection.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        res.status(401).json({
            authenticated: false
        });
    }
});
export default protect;