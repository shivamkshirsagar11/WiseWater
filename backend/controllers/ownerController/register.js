import pkg from 'bcryptjs';
const { hash } = pkg;
import ownerModel from '../../models/ownerModel.js';
import companyModel from '../../models/companyModel.js';
import { generateJWTtoken } from '../../utility/generateJWTtoken.js';
import { ownerValidation } from '../../validations/ownerValidation/ownerValidation.js';

// registerUser registers any user
// @desc    registerUser :- register owner check company id and company name
// @route   get /api/owner/register
// @access  public

export async function registerUser(req, res) {
    const {onlyValidation} = req.body;
    const error = await ownerValidation(req.body);

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
        });
    } else {
        const { userData, companyData } = req.body;
        try {
            const company = await companyModel.create({
                name: companyData.name,
                email: companyData.email,
                contact: companyData.contact,
                address: companyData.address,
                serviceTime: companyData.serviceTime,
            });
            const owner = await ownerModel.create({
                firstname: userData.firstname,
                lastname: userData.lastname,
                contact: userData.contact,
                email: userData.email,
                password: await hash(userData.password, 10),
                company_name: companyData.name
            });

            res.status(201).json({
                token: generateJWTtoken(owner._id, "Owner"),
                type: 'data'
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: {
                    errorMessage: ['Interanl Server Error']
                }
            })
        }
    }
}