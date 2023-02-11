import  workerApplicationModel  from '../../models/workerApplicationModel.js';
import { workerValidation } from '../../validations/workerValidation/workerValication.js';

// @desc    submitJobApplication :- it will use to submit job application of user to company
// @route   post /api/user/
// @access  public

export async function submitJobApplicationForm(req, res) {

    const {onlyValidation} = req.body;
    const error = await workerValidation(req.body);
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
        const { firstname, email, lastname, contact, companyname } = req.body;
        try {
            const worker = await workerApplicationModel.create({
                firstname,
                lastname,
                contact,
                email,
                company_name: companyname
            });
            res.status(201).json({
                _id: worker._id,
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
