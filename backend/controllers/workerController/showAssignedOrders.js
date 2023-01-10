const Order = require('../../models/orderModel');
exports.showAssignedOrders = async (req,res) =>{
const assignedOrders = await Order.find({$and:[{worker_id:req.user._id},{status:{$eq:"assigned"}}]})
console.log(assignedOrders)
if (assignedOrders){
    res.status(200)
    res.json({
        found:true,
        assignedOrders:assignedOrders
    })
}
else{
    res.status(204)
    res.json({
            found:false
    }
    )
}
}