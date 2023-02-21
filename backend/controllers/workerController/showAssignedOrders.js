import OrderModel from '../../models/orderModel.js';
import customerModel from '../../models/customerModel.js';
import workerModel from '../../models/workerModel.js';

export async function showAssignedOrders(req, res) {

    try {
        const assignedOrders = await OrderModel.find({ $and: [{ worker_id: req.userid }, { status: { $eq: "assigned" } }] }, { _id: 0, __v: 0 }).populate({ path: 'customer_id', select: '-_id -password -__v -latitude -longitude' }).populate({
            path: 'worker_id', select: '-__v -latitude -longitude -_id -password'
        });

        const assignedOrdersWithRenamedField = assignedOrders.map(order => {
            const { customer_id: customer_data, worker_id: worker_data, _doc: order_details } = order;

            delete order_details.customer_id
            delete order_details.worker_id
            delete order_details.address._id

            return { customer_data, worker_data, ...order_details };
        });
        console.log(assignedOrdersWithRenamedField)

        // const {longitude, latitude} = await customerModel.findOne({_id:customer_id})
        // const worker = await workerModel.findOne({_id:req.userid})
        // const wlongitude = worker.longitude;
        // const wlatitude = worker.latitude;
        // const location = {
        //     worker:{
        //         longitude: wlongitude,
        //         latitude: wlatitude
        //     },
        //     customer:{
        //         longitude: longitude,
        //         latitude: latitude
        //     }
        // }
        res.status(200).json({
            assignedOrders: assignedOrdersWithRenamedField,
            location: {}
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