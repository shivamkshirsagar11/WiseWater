import OrderModel from '../../models/orderModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function showAssignedOrders(req, res) {

    try {
        console.log('from show assigned orders page')
        const { company_name } = await OwnerModel.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });

        const assignedOrders = await OrderModel.find({ company_name, status: "assigned" }, { _id: 0, __v: 0 }).populate({ path: 'customer_id', select: '-_id -password -__v -latitude -longitude' }).populate({
            path: 'worker_id', select: '-__v -latitude -longitude -_id -password'
        });
        // console.log(assignedOrders)
        const assignedOrdersWithRenamedField = assignedOrders.map(order => {
            const { customer_id: customer_data, worker_id: worker_data, _doc: order_details } = order;

            delete order_details.customer_id
            delete order_details.worker_id
            delete order_details.address._id

            return { customer_data, worker_data, ...order_details };
        });
        console.log(assignedOrdersWithRenamedField)

        if (assignedOrders) {
            res.status(200).json({
                assignedOrders: assignedOrdersWithRenamedField,
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