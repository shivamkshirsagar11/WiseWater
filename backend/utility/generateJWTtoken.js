import pkg from 'jsonwebtoken';
const { sign } = pkg;

export function generateJWTtoken(_id, collectionName) {
    return sign({ _id, collectionName }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}