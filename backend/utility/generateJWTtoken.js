import pkg from 'jsonwebtoken';
const { sign } = pkg;
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../.env' });
export function generateJWTtoken(_id, collectionName) {
    return sign({ _id, collectionName }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}