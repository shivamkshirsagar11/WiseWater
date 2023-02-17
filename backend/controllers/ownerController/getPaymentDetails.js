import paymentModel from '../../models/paymentModel.js';
import Company from '../../models/companyModel.js';
import OrderModel from "../../models/orderModel.js";
import ownerModel from '../../models/ownerModel.js';


// getPaymentDeatils user type : owner
// @desc    getPaymentDeatils : owner can get all the payment details by this controller
// @route   post /api/owner/payment-details
// @access  private
// applied middleware :- userTypeHandler , protect

export async function getPaymentDetails(req, res) {
    try {
        console.log(req.userid);
        var { company_name } = await ownerModel.findOne({ _id: req.userid }, { _id: 0, company_name: 1 });
        console.log('name of company is ');
        console.log(company_name);
        const paymentList = await paymentModel.find({ company_name });
        console.log('from owner getPayment list');
        console.log(paymentList);
        res.status(200).json({
            paymentList
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