import OrderModel from '../../models/orderModel.js';
export async function showAssignedOrders(req, res) {

    try {
        const assignedOrders = await OrderModel.find({ $and: [{ worker_id: req.userid }, { status: { $eq: "assigned" } }] })
        res.status(200).json({
            found: true,
            assignedOrders: assignedOrders
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