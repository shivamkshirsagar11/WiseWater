import { decodeJWTtoken } from '../utility/decodeJWTtoken.js';

const userTypeHandler = (req, res, next) => {
    console.log('asd')
    const url = req.url.split('/');
    console.log('from user type handler')
    console.log('url is ', url)
    if ('user' === url[2]) {
        next();
        return;
    } else {
        // REASON :- FOR THIS USER TYPE CHECKING IS NOT REQUIRED
        if ('application' === url[3] || 'register' === url[3]) {
            next();
            return; // otherwise after calling next it will run remaing code but we don't want that to do
        }
        const { collectionName } = decodeJWTtoken(req, res);
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