import { verify } from 'jsonwebtoken';
export function decodeJWTtoken(req, res) {

    const { authorization } = req.headers;
    console.log("from decode jwt");
    console.log(authorization);
    if ('Bearer undefined' !== authorization) {
        const token = authorization.split(' ')[1];
        if ('undefined' !== token) {
            const decoded = verify(token, "4mt&!RF&6L7n&^@3k&ME4zaK9!ou^*7SH0J8q@U2");
            if (decoded === undefined) {
                res.status(401).json({
                    error: {
                        errorMessage: ['you are not authorized for this page']
                    }
                });
            }
            else {
                return decoded;
            }
        } else {
            console.log('here')
            res.status(401).json({
                error: {
                    errorMessage: ['you are not authorized for this page']
                }
            });
        }
    } else {
        console.log('baread header is not exists')
        res.status(401).json({
            error: {
                errorMessage: ['you are not authorized for this page']
            }
        });
    }
}