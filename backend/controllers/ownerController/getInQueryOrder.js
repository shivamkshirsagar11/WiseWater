import expressAsyncHandler from "express-async-handler";
import WorkerOrderQuery from "../../models/workerOrderQuery.js";

export const getInQueryOrder = expressAsyncHandler(async (req, res) => {
    const { order_id } = req.body;
    const query = await WorkerOrderQuery.find({ order_id: order_id })

    if (query) {
        res.status(200);
        res.json({ found: true, query })
    }
    else {
        throw new Error("Order Id Illegal!");
    }
});