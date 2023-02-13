import expressAsyncHandler from "express-async-handler";
import OrderModel from "../../models/orderModel.js";


export const getOrder = expressAsyncHandler(async (req,res)=>{
const {order_id} = req.body;
const query = await OrderModel.find({_id:order_id})
console.log("Owner -> getinQueryOrder")
console.log(query);
if(query){
    res.status(200);
    res.json({found:true,order:query})
}
else{
    throw new Error("Order Id Illegal!");
}
});