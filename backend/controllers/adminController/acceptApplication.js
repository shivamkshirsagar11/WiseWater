import CompanyModel from '../../models/companyModel.js';
import OwnerModel from '../../models/ownerModel.js';
import { getOwnersApplications } from './getOwnersApplications.js';

const acceptApplication = async (req, res) => {
    try {
        // const owners = await OwnerModel.find({ status: "pending" }, { password: 0, latitude: 0, longitude: 0, __v: 0 });

        const owner = await OwnerModel.findByIdAndUpdate({ _id: req.body.ownerId }, { status: "accepted" });
        const company = await CompanyModel.findOneAndUpdate({ name: owner.company_name }, { status: "accepted" });

        console.log(owner);
        getOwnersApplications(req, res);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

export { acceptApplication }