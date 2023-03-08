import OrderModel from '../../models/orderModel.js';
export async function showDelieverOrders(req, res) {

    try {

        const delieveredOrders = await OrderModel.find({ $and: [{ worker_id: req.userid }, { status: { $eq: "delievered" } }] }, { _id: 0, __v: 0 }).populate({ path: 'customer_id', select: '-_id -password -__v -latitude -longitude' }).populate({
            path: 'worker_id', select: '-__v -latitude -longitude -_id -password'
        });

        const delieveredOrdersWithRenamedField = delieveredOrders.map(order => {
            const { customer_id: customer_data, worker_id: worker_data, _doc: order_details } = order;

            delete order_details.customer_id
            delete order_details.worker_id
            delete order_details.address._id

            return { customer_data, worker_data, ...order_details };
        });

        res.status(200).json({
            delieveredOrders: delieveredOrdersWithRenamedField
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