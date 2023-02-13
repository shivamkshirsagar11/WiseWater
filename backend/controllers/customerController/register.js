import pkg from 'bcryptjs';
const { hash } = pkg;
import CustomerModel from '../../models/customerModel.js';
import { generateJWTtoken } from '../../utility/generateJWTtoken.js';
import { customerValidation } from '../../validations/customerValidation/customerValidation.js';

// registerUser registers any user
// @desc    registerUser :- register customer
// @route   get /api/customer/register
// @access  public

export async function registerUser(req, res) {
    const {onlyValidation} = req.body;
    const error = await customerValidation(req.body);
    if (error && error.errorMessage.length > 0) {
        res.status(error.statusCode).json({
            error: {
                errorMessage: error.errorMessage
            }
        });
    }
    else if(onlyValidation){
        res.status(200).json({
            type:"data"
        })
    }
    else{
        try {
                const { firstname, email, password, lastname, address, contact } = req.body;
            const user = await CustomerModel.create({
                firstname,
                lastname,
                contact,
                address,
                email,
                password: await hash(password, 10)
            });

            res.status(200).json({
                token: generateJWTtoken(user._id, "Customer"),
                type: 'data'
            });
        } catch (error) {
            res.status(500).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }
    }
    
}

