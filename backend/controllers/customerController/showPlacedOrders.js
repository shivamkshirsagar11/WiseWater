import OrderModel from '../../models/orderModel.js';


// showPlacedOrders user type : customer
// @desc    showPlacedOrders : customer can see placed orders by this controller
// @route   post /api/customer/show-placed-orders
// @access  private
// applied middleware :- userTypeHandler , protect

export async function showPlacedOrders(req, res) {
    try {
        const orderList = await OrderModel.find({ customer_id: req.userid });
        res.status(200).json({
            orderList,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}