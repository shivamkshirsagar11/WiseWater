const Order = require('../../models/orderModel');
exports.showDelieverOrders = async (req, res) => {
    const delieveredOrders = await Order.find({ $and: [{ worker_id: req.user._id }, { status: "delievered" }] })
    if (delieveredOrders) {
        res.status(200)
        res.json({
            found: true,
            delieveredOrders
        })
    }
    else {
        res.status(204)
        res.json({
            found: false
        }
        )
    }
}