import WorkerApplicationModel from '../../models/workerApplicationModel.js';

export async function deleteWorkerApplication(req, res) {
    const workerApplication = { ...req.body.workerApplication };
    try {
        const data = await WorkerApplicationModel.findOneAndDelete({ cemail: workerApplication.email });
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}