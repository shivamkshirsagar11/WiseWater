import WorkerApplicationModel from '../../models/workerApplicationModel.js';
import WorkerModel from '../../models/workerModel.js';
import pkg from 'bcryptjs';
const { hash } = pkg;
import { passwordGen } from '../../utility/passwordGenerator.js';
import { sendHiringEmail } from '../../utility/mailer.js';
import CompanyModel from '../../models/companyModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function hireWorker(req, res) {

    const workerApplication = { ...req.body.workerApplication };
    delete workerApplication.applicationdate;
    const password = passwordGen(10);
    workerApplication.password = await hash(password, 10);
    try {
        const {company_name} = await OwnerModel.findOne({_id:req.userid}, { password: 0 });
        const companyDetails = await CompanyModel.findOne({name:company_name});
        const checkWorkerApplication = await WorkerApplicationModel.find({ company_name: company_name, email: workerApplication.email }, { _id: 0 });
        if (checkWorkerApplication) {
            const nextDayToWork = "You can start working from nect monday.";
            const isSent = await sendHiringEmail(workerApplication.email, password, companyDetails.email, companyDetails.name, `${workerApplication.firstname} ${workerApplication.lastname}`, nextDayToWork, `${companyDetails.address.line1}, ${companyDetails.address.line2}, ${companyDetails.address.city}, ${companyDetails.address.pincode}`);
            if(isSent){
                const worker = await WorkerModel.create({
                    ...workerApplication
                });
                // when owner hire a worker
                // the all applications related to that user will be removed from workerApplication collection
                const val = await WorkerApplicationModel.deleteMany({ $or: [{ email: worker.email }, { contact: worker.contact }] });
                
                res.status(200).json({
                    message: 'success',
                });
            }
            else{
                res.status(500).json({
                    error: {
                        errorMessage: ['Interanl Server Error']
                    }
                })
            }
        } else {
            console.log(error);
            res.status(404).json({
                error: {
                    errorMessage: ['worker application is not found']
                }
            })
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