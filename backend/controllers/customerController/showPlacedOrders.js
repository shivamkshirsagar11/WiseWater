import OrderModel from '../../models/orderModel.js';


// showPlacedOrders user type : customer
// @desc    showPlacedOrders : customer can see placed orders by this controller
// @route   post /api/customer/show-placed-orders
// @access  private
// applied middleware :- userTypeHandler , protect

export async function showPlacedOrders(req, res) {
    try {
        const orderList = await OrderModel.find({ customer_id: req.userid }, { _id: 0, __v: 0 }).populate({ path: 'customer_id', select: '-_id -password -__v -latitude -longitude' }).populate({
            path: 'worker_id', select: '-__v -latitude -longitude -_id -password'
        });

        const orderListWithRenamedField = orderList.map(order => {
            const { customer_id: customer_data, worker_id: worker_data, _doc: order_details } = order;

            delete order_details.customer_id
            delete order_details.worker_id
            delete order_details.address._id

            return { customer_data, worker_data, ...order_details };
        });
        console.log(orderListWithRenamedField)

        res.status(200).json({
            orderList: orderListWithRenamedField,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}