import { BillMailer } from "../../utility/billMailer.js";
import { PDF_Creater } from "../../utility/pdfkit.js";
import CustomerModel from '../../models/customerModel.js';
import CompanyModel from '../../models/companyModel.js';
import ownerModel from '../../models/ownerModel.js';
import PaymentModel from '../../models/paymentModel.js';

export const sendRecipt = async (req, res) => {
    console.log(req.body.customer_id);
    const customer_data = await CustomerModel.findOne({ _id: req.body.customer_id });
    const data = await ownerModel.findOne({ _id: req.userid });
    const company_data = await CompanyModel.findOne({ name: data.company_name });
    const { payment, _id: paymentId } = await PaymentModel.findOne({ customer_id: req.body.customer_id });

    if (0 === payment.hotWater.water_quantity) delete payment.hotWater;
    if (0 === payment.coldWater.water_quantity) delete payment.coldWater;
    if (0 === payment.normalWater.water_quantity) delete payment.normalWater;
    try {
        PDF_Creater(company_data.name, company_data.contact, customer_data.contact, `${customer_data.firstname} ${customer_data.lastname}`, company_data.address, payment);
        console.log(customer_data)
        // const response = await PaymentModel.findByIdAndDelete(paymentId);
        await BillMailer(customer_data.contact, customer_data.email);
        res.status(200).json({
            message: "pdf sent",
            status: "all ok"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}