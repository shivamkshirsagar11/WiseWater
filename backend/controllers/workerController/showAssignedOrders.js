import OrderModel from '../../models/orderModel.js';
import customerModel from '../../models/customerModel.js';
import workerModel from '../../models/workerModel.js';

export async function showAssignedOrders(req, res) {

    try {
        const assignedOrders = await OrderModel.find({ $and: [{ worker_id: req.userid }, { status: { $eq: "assigned" } }] })
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
            found: true,
            assignedOrders: assignedOrders,
            location:{}
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