import OrderModel from '../../models/orderModel.js';
import paymentModel from '../../models/paymentModel.js';

const handlePayment = async (assignedOrder) => {
    try {
        var obj = await paymentModel.findOne({ $and: [{ customer_id: assignedOrder.customer_id }, { company_name: assignedOrder.company_name }] });

        console.log(assignedOrder);
        if (null === obj) {
            obj = await paymentModel.create({
                customer_id: assignedOrder.customer_id,
                company_name: assignedOrder.company_name,
                payment: { hotWater: 0, coldWater: 0, normalWater: 0 }
            })
        }
        console.log('from worker controler order deliever page')
        console.log('obj')
        console.log(obj)
        obj.payment[assignedOrder.water_type] += assignedOrder.cost * assignedOrder.water_quantity;
        obj = await paymentModel.findOneAndUpdate(
            { $and: [{ customer_id: assignedOrder.customer_id }, { company_name: assignedOrder.company_name }] },
            obj
        );
        console.log(obj)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

export async function orderDeliever(req, res) {

    const { orderId } = req.body;
    console.log(orderId)
    try {
        const assignedOrder = await OrderModel.findOne({ $and: [{ worker_id: req.userid }, { orderId }] })
        console.log(assignedOrder)
        if (assignedOrder) {
            await handlePayment(assignedOrder);
            const updated = await OrderModel.updateOne({ orderId }, { $set: { status: "delievered" } })
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