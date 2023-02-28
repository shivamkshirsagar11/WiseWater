import { decodeJWTtoken } from '../utility/decodeJWTtoken.js';

const userTypeHandler = (req, res, next) => {
    const url = req.url.split('/');
    console.log(req.url);
    if ('user' === url[2]) {
        next();
        return;
    } else {
        // REASON :- FOR THIS USER TYPE CHECKING IS NOT REQUIRED
        if ('application' === url[3] || 'register' === url[3]) {
            next();
            return; // otherwise after calling next it will run remaing code but we don't want that to do
        }
        const temp_resp = decodeJWTtoken(req, res);
        if (res.statusCode === 401) {
            return;
        }
        const { collectionName } = temp_resp;
        console.log('abc')
        if (collectionName.toLowerCase() === url[2].toLowerCase()) {
            console.log('jhere')
            next();
        }
        else {
            res.status(401).json({
                error: {
                    errorMessage: ['you are not authorized for this page']
                }
            });
        }
    }
}

export default userTypeHandler;