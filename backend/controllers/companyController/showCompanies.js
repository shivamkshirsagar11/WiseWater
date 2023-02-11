import  find  from '../../models/companyModel.js';

export async function showCompanies(req, res) {

    try {
        const companies = await find({}, { _id: 0 });
        res.status(200).json({
            companies,
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