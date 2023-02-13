
import CompanyModel from '../../models/companyModel.js';
import WorkerModel from '../../models/workerModel.js';

export async function profile(req, res) {

    try {
        const userData = await WorkerModel.findOne({ _id: req.userid }, { password: 0 });

        if (userData) {

            const companyData = await CompanyModel.findOne({ name: userData.company_name });

            if (companyData) {
                res.status(200).json({
                    userData,
                    companyData
                })
            } else {
                res.status(404).json({
                    error: {
                        errorMessage: ['company not found']
                    }
                });
            }
        } else {
            res.status(404).json({
                error: {
                    errorMessage: ['user not found']
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}