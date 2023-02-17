import OrderModel from '../../models/orderModel.js';
<<<<<<< Updated upstream
=======
import paymentModel from '../../models/paymentModel.js';
import CustomerModel from '../../models/customerModel.js';
import CompanyModel from '../../models/companyModel.js';

const handlePayment = async (assignedOrder, res) => {
    try {
        var obj = await paymentModel.findOne({ $and: [{ customer_id: assignedOrder.customer_id }, { company_name: assignedOrder.company_name }] });
        const customer = await CustomerModel.findOne({ _id: assignedOrder.customer_id });
        const company = await CompanyModel.findOne({ name: assignedOrder.company_name });
        console.log('from order delivery')
        console.log(customer);
        console.log(company);
        console.log(obj);

        console.log(assignedOrder);
        if (null === obj) {
            obj = await paymentModel.create({
                customer_id: customer._id,
                customer_name: customer.firstname + ' ' + customer.lastname,
                company_name: assignedOrder.company_name,
                customer_contact: customer.contact,
                company_contact: company.contact,
                payment: { hotWater: { price: company.waterPrice.hotWater, quantity: 0 }, coldWater: { price: company.waterPrice.coldWater, quantity: 0 }, normalWater: { price: company.waterPrice.normalWater, quantity: 0 } }
            })
        }
        console.log('from worker controler order deliever page')
        console.log('obj')
        console.log(obj)
        console.log(assignedOrder.water_type)
        console.log(obj.payment[assignedOrder.water_type].quantity)
        obj.payment[assignedOrder.water_type].quantity += assignedOrder.water_quantity;
        console.log(obj)
        // obj = await paymentModel.findOneAndUpdate(
        //     { _id: obj._id },
        //     obj
        // );
        obj = await paymentModel.updateOne({ _id: obj._id }, { $set: { payment: obj.payment } })
        console.log(obj)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
        return -1;
    }
}
>>>>>>> Stashed changes

export async function orderDeliever(req, res) {

    const { order_id } = req.body;

    try {
        const assignedOrder = await OrderModel.find({ $and: [{ worker_id: req.userid }, { _id: order_id }] })
        if (assignedOrder) {
<<<<<<< Updated upstream
            const updated = await updateOne({ _id: order_id }, { $set: { status: "delievered" } })
=======
            const result = await handlePayment(assignedOrder, res);

            // -1 show that there is some error
            if (-1 == result) return;
            const updated = await OrderModel.updateOne({ _id: order_id }, { $set: { status: "delievered" } })
>>>>>>> Stashed changes
            res.status(200).json({
                message: 'success'
            })
        }
        else {
            res.status(404).json({
                error: {
                    errorMessage: ['order is not found']
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}