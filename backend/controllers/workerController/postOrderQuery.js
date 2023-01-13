const Order = require("../../models/orderModel");
const WorkerOrderQuery = require("../../models/workerOrderQuery");
const{ DateTime } = require('luxon');
const asyncHandler = require('express-async-handler');

exports.postOrderQuery = asyncHandler(async(req,res)=>{
const order = await Order.find({$and:[{worker_id:req.user._id},{_id:req.body.order_id}]})
const datetime = DateTime.local()
const currentDateTime = datetime.toLocaleString(DateTime.DATETIME_MED);
console.log("from worker -> post query: ",currentDateTime);
console.log(order);
if(order){
const query = await WorkerOrderQuery.create({
    order_id:req.body.order_id,
    ref_id:req.user._id,
    query:req.body.query,
    date:currentDateTime,
    worker_name:req.user.firstname,
    worker_email:req.user.email,
    worker_contact:req.user.contact
});
const update = await Order.updateOne({_id:req.body.order_id},{$set:{status:"in-query"}});
console.log(query);
console.log(update);
if(query && update){
    res.status(200)
res.json({
    saved:"ok"
})
}
else{
    throw new Error("Error on saving Query!")
}
}
else{
    throw new Error("Incorrect Order Information")
}
}
);