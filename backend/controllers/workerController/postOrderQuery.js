import OrderModel from "../../models/orderModel.js";
import WorkerModel from "../../models/workerModel.js";
import WorkerOrderQuery from "../../models/workerOrderQuery.js";
import { DateTime } from 'luxon';
import asyncHandler from 'express-async-handler';

export const postOrderQuery = asyncHandler(async (req, res) => {
    const order = await OrderModel.find({ $and: [{ worker_id: req.userid }, { _id: req.body.order_id }] });
    const worker = await WorkerModel.findOne({_id:req.userid});
    const datetime = DateTime.local()
    const currentDateTime = datetime.toLocaleString(DateTime.DATETIME_MED);
    console.log("from worker -> post query: ", currentDateTime);
    console.log(order);
    if (order) {
        const query = await WorkerOrderQuery.create({
            order_id: req.body.order_id,
            ref_id: req.userid,
            query: req.body.query,
            date: currentDateTime,
            worker_name: worker.firstname,
            worker_email: worker.email,
            worker_contact: worker.contact
        });
        const update = await OrderModel.updateOne({ _id: req.body.order_id }, { $set: { status: "in-query" } });
        console.log(query);
        console.log(update);
        if (query && update) {
            res.status(200)
            res.json({
                saved: "ok"
            })
        }
        else {
            throw new Error("Error on saving Query!")
        }
    }
    else {
        throw new Error("Incorrect Order Information")
    }
}
);