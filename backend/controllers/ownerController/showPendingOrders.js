import OrderModel from '../../models/orderModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function showPendingOrders(req, res) {

    try {
        const { company_name } = await OwnerModel.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const pendingOrderList = await OrderModel.find({ company_name, status: "pending" }, { _id: 0 }).populate({ path: 'customer_id', select: '-__v -latitude -longitude -password -_id' });
        console.log('this is pending order list')
        console.log(pendingOrderList)

        const pendingOrdersWithRenamedField = pendingOrderList.map(order => {
            const { customer_id: customer_data, _doc: order_details } = order;
            console.log('from map' + order)
            delete order_details.customer_id
            return { customer_data, ...order_details };
        });
        console.log(pendingOrdersWithRenamedField)
        res.status(200).json({
            pendingOrderList: pendingOrdersWithRenamedField,
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