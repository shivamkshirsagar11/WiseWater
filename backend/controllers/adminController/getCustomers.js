import CustomerModel from '../../models/customerModel.js';

const getCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.find({}, { _id: 0, password: 0, latitude: 0, longitude: 0, __v: 0 });
        console.log(customers);
        res.status(200).json({
            customers
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

export { getCustomers }