import expressAsyncHandler from "express-async-handler";
import WorkerOrderQuery from "../../models/workerOrderQuery.js";

export const inQueryOrder = expressAsyncHandler(async (req, res) => {
    const inQueryOrders = await WorkerOrderQuery.find({});

    if (inQueryOrders) {
        res.status(200);
        res.json({ inQueryOrders, found: true });
    }
    else {
        res.status(201)
        res.json({
            found: false
        })
    }
})