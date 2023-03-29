import Company from '../../models/companyModel.js';

export async function showCompanies(req, res) {

    try {
        const companies = await Company.find({ status: "accepted" }, { _id: 0 });
        console.log('from show companies controller')
        console.log('print companies array')
        console.log(companies)
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