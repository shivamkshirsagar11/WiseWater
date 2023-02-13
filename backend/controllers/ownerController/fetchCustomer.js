import expressAsyncHandler from "express-async-handler";
import CustomerModel from '../../models/customerModel.js';
export const fetchCustomer = expressAsyncHandler(async (req, res) => {
    const customer = await CustomerModel.find({ _id: req.body.customer_id }, { password: 0 })

    if (customer) {
        res.status(200);
        res.json({ customer: customer[0], found: false });
    }
    else {
        res.json({ found: false });
    }
});