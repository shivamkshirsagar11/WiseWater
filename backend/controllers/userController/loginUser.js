
import { mapCollectionName } from '../../utility/mappingCollection.js';
import { generateJWTtoken } from '../../utility/generateJWTtoken.js';
import pkg from 'bcryptjs';
const { compare, hash } = pkg;
import pkg2 from "validator";
import adminModel from '../../models/adminModel.js';
const { isEmail } = pkg2;

// @desc    loginUser :- loggedin all types of users
// @route   post /api/user
// @access  public

export async function loginUser(req, res) {

    const { email, password, locationObj } = req.body;
    // console.log(email);
    // console.log(password);


    console.log("from login");
    var error = [];
    // login validation
    if (!email) {
        error.push('email is required')
    }
    if (email && !isEmail(email)) {
        error.push('email is not a valid');
    }
    if (!password) {
        error.push('password is required')
    }

    if (error.length > 0) {
        res.status(400).json({
            error: {
                errorMessage: error
            }
        });
    } else {
        const collection = mapCollectionName(req.body.collectionName);
        const user = await collection.findOne({ email }, { password: 1, _id: 1, status: 1 });
        console.log(user)
        if (user?.status === 'pending') {
            res.status(400).json({
                error: {
                    errorMessage: ['invalid credential']
                }
            })
            return;
        }
        if (user && (await compare(password, user.password))) {
            console.log(user);
            const updateUser = await collection.updateOne({ _id: user._id }, { $set: { longitude: locationObj.longitude, latitude: locationObj.latitude } });
            console.log(updateUser)
            res.json({
                token: generateJWTtoken(user._id, req.body.collectionName) // whty every time create new token
            });
        } else {
            res.status(400).json({
                error: {
                    errorMessage: ['invalid credential']
                }
            })
        }
    }
}