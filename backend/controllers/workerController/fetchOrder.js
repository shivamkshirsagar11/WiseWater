import OrderModel from "../../models/orderModel.js";

export async function fetchOrder(req, res) {
    const { order_id } = req.body;

    try {
        const order = await OrderModel.find({ $and: [{ _id: order_id }, { worker_id: req.userid }] });
        console.log(order);
        if (order) {
            res.status(200).json({
                order,
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