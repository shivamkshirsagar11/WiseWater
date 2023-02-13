import OrderModel from '../../models/orderModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function showPendingOrders(req, res) {

    try {
        const { company_name } = await OwnerModel.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });
        const pendingOrderList = await OrderModel.find({ company_name, status: "pending" });
        console.log(pendingOrderList)
        res.status(200).json({
            pendingOrderList: pendingOrderList,
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