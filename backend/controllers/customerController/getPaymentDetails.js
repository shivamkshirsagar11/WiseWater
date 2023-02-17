import paymentModel from '../../models/paymentModel.js';
import Company from '../../models/companyModel.js';


// getPaymentDeatils user type : customer
// @desc    getPaymentDeatils : customer can get all the payment details by this controller
// @route   post /api/customer/payment-details
// @access  private
// applied middleware :- userTypeHandler , protect

export async function getPaymentDetails(req, res) {
    try {
        var paymentList = await paymentModel.find({ customer_id: req.userid }, { customer_id: 0, _id: 0 });
        console.log('get payment details from customer', paymentList);
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