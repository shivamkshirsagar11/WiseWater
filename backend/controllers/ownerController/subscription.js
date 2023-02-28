import subscriptionModel from "../../models/subscriptionModel.js";
import customerModel from "../../models/customerModel.js";
async function getAllCustomerPlans(req, res) {
    try{
        const plans = await subscriptionModel.find({status:"pending"})
        let customerDet = new Array(plans.length)
        for(var i = 0;i<plans.length;i++){
            customerDet[i] = await customerModel.findOne({_id:plans[i].user_id},{firstname:1,lastname:1,contact:1,address:1})
        }
        console.log(customerDet);
        res.status(200).json({
            plans:plans,
            customers:customerDet
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

export {getAllCustomerPlans};