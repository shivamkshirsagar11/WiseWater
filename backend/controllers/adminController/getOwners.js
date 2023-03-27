import companyModel from '../../models/companyModel.js';
import OwnerModel from '../../models/ownerModel.js';

const getOwners = async (req, res) => {
    try {
        const owners = await OwnerModel.find({status:'accepted'}, { _id: 0, password: 0, latitude: 0, longitude: 0, __v: 0 });


        const someFunction = (myArray) => {
            const promises = myArray.map(async (myValue) => {
                console.log(myValue.company_name)
                return (await companyModel.findOne({ name: myValue.company_name }, { _id: 0 }));
            });
            return Promise.all(promises);
        }

        var companyList = await someFunction(owners);

        var resp = [];
        for (let i = 0; i < owners.length; i++) {
            resp.push({
                ownerData: owners[i],
                companyData: companyList[i]
            })
        }
        console.log(resp);
        res.status(200).json({
            owners: resp
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

export { getOwners }