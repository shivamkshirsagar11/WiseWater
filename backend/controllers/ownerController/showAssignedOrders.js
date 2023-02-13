import OrderModel from '../../models/orderModel.js';
import OwnerModel from '../../models/ownerModel.js';

export async function showAssignedOrders(req, res) {

    try {
        const { company_name } = await OwnerModel.findOne({ _id: req.userid }, { company_name: 1, _id: 0 });

        const assignedOrders = await OrderModel.find({ company_name, status: "assigned" })
        if (assignedOrders) {
            res.status(200).json({
                assignedOrders,
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