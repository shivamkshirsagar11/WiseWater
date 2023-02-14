import paymentModel from '../../models/paymentModel.js';
import Company from '../../models/companyModel.js';


// getPaymentDeatils user type : owner
// @desc    getPaymentDeatils : owner can get all the payment details by this controller
// @route   post /api/owner/payment-details
// @access  private
// applied middleware :- userTypeHandler , protect

export async function getPaymentDetails(req, res) {
    try {
        var company_name = await Owner.findOne({ _id: req.userid }, { _id: 0, company_name: 1 });
        console.log('name of company is ');
        console.log(company_name);
        const someFunction = (myArray) => {
            const promises = myArray.map(async (myValue) => {
                console.log(myValue.company_name)
                return (await Company.findOne({ name: myValue.company_name }, { _id: 0, contact: 1 }));
            });
            return Promise.all(promises);
        }
        var contactList = await someFunction(paymentList);
        var resp = [];
        for (let i = 0; i < contactList.length; i++) {
            resp.push({
                contact: contactList[i].contact,
                company_name: paymentList[i].company_name,
                payment: paymentList[i].payment
            })
        }
        console.log(resp);
        res.status(200).json({
            paymentList: resp
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