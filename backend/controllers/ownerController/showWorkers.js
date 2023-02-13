import WorkerModel from '../../models/workerModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function showWorkers(req, res) {
    console.log('from show workers')
    console.log(req.body);

    try {
        const { company_name } = await OwnerModel.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const workers = await WorkerModel.find({ company_name }, { password: 0 });

        res.status(200).json({
            workers,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}