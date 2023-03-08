import OrderModel from "../../models/orderModel.js";
import WorkerModel from "../../models/workerModel.js";

export async function trackOrder(req, res) {

    const { orderId } = req.body;

    const order = await OrderModel.findOne({ $and: [{ orderId }, { customer_id: req.userid }] });

    if (order) {
        const worker = await WorkerModel.findOne({ _id: order.worker_id });

        if (worker) {
            res.status(200).json({
                order: order,
                worker
            })
        }
        else {
            res.status(404).json({
                error: "worker who is assigned for you order not found"
            })
        }
    } else {
        res.status(404).json({
            error: {
                errorMessage: ['order is not found']
            }
        })
    }
}