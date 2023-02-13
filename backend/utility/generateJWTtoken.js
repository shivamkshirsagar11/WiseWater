import pkg from 'jsonwebtoken';
const { sign } = pkg;
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: '../.env' });
export function generateJWTtoken(_id, collectionName) {
    return sign({ _id, collectionName }, "4mt&!RF&6L7n&^@3k&ME4zaK9!ou^*7SH0J8q@U2", {
        expiresIn: '30d'
    });
}