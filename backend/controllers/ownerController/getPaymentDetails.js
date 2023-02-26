import paymentModel from '../../models/paymentModel.js';
import CompanyModel from '../../models/companyModel.js';
import ownerModel from '../../models/ownerModel.js';

// getPaymentDeatils user type : owner
// @desc    getPaymentDeatils : owner can get all the payment details by this controller
// @route   post /api/owner/payment-details
// @access  private
// applied middleware :- userTypeHandler , protect

export async function getPaymentDetails(req, res) {
    try {
        console.log('from get payment details owner');
        const { company_name } = await ownerModel.findOne({ _id: req.userid }, { company_name: 1 });
        console
        const paymentList = await paymentModel.find({ company_name }, { _id: 0, __v: 0 }).populate({ path: 'customer_id', select: '-__v -latitude -longitude -password' });
        // console.log(data);

        const paymentListWithRenamedField = paymentList.map(order => {
            const { customer_id: customer_data, _doc: otherDetails } = order;

            delete otherDetails.customer_id

            return { customer_data, ...otherDetails };
        });
        console.log(paymentListWithRenamedField)

        res.status(200).json({
            paymentList: paymentListWithRenamedField
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