import CustomerModel from '../../models/customerModel.js';

export async function profile(req, res) {

    try {
        const userData = await CustomerModel.findOne({ _id: req.userid });
        if (userData) {
            res.status(200).json({
                userData
            });
        } else {
            res.status(404).json({
                error: {
                    errorMessage: ['user not found']
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }

}