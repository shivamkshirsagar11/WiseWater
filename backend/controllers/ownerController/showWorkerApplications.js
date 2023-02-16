import WorkerApplicationModel from '../../models/workerApplicationModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function showWorkerApplications(req, res) {

    try {
        const { company_name } = await OwnerModel.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const workerApplications = await WorkerApplicationModel.find({ company_name}, { _id: 0, password: 0 });
        res.status(200).json({
            workerApplications,
            found: true,
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