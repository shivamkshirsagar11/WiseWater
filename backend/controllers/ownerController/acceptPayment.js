import paymentModel from "../../models/paymentModel.js";
import customerModel from "../../models/customerModel.js";
import { PDF_Creater } from "../../utility/pdfkit.js";

export async function acceptPayment(req, res) {
    const { payment_id } = req.body;

    try {
        const data = await paymentModel.findOne({ payment_id });
        const customer = await customerModel.findOne({ _id: data.customer_id });
        console.log(customer)
        // await PDF_Creater(customer.contact, customer.firstname + ' ' + customer.lastname, customer.address.line1, customer.address.line2, customer.address.city, customer.address.pincode);
        await paymentModel.deleteOne({ payment_id });
        res.status(200).json({
            message: 'Success'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}
