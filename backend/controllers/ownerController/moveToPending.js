import expressAsyncHandler from "express-async-handler";
import OrderModel from "../../models/orderModel.js";
import WorkerOrderQuery from "../../models/workerOrderQuery.js";

export const moveToPending = expressAsyncHandler(async (req,res)=>{
const {order_id} = req.body;
const order = await OrderModel.find({_id:order_id})
console.log("Owner -> getinQueryOrder")
console.log(order);
if(order){
    const update = await OrderModel.updateOne({_id:order_id},{$set:{status:"pending",worker_id:null}})
    const deleted = await WorkerOrderQuery.deleteOne({order_id:order_id})
    if( update && deleted ){
        res.status(200);
        res.json({success:true})
    }
    else{
        throw new Error("Error updating Status of Order");
    }
}
else{
    throw new Error("Order Id Illegal!");
}
});