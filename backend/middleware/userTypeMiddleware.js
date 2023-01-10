const { decodeJWTtoken } = require('../utility/decodeJWTtoken');

const userTypeHandler = (req, res, next) => {
    const url = req.url.split('/');

    if ('user' === url[2]) {
        next();
        return;
    } else {
        // REASON :- FOR THIS USER TYPE CHECKING IS NOT REQUIRED
        if( 'application'===url[3] || 'register'===url[3] ) {
            next();
            return; // otherwise after calling next it will run remaing code but we don't want that to do
        }
        const decoded = decodeJWTtoken(req,res);
        console.log(decoded);
        if (decoded.collectionName.toLowerCase() === url[2].toLowerCase()) {
            next();
        }
        else {
            res.status(401);
            throw new Error('not authorized');
        }
    }
}

module.exports = { userTypeHandler };