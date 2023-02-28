import subscriptionModel from "../../models/subscriptionModel";
import customerModel from "../../models/customerModel";
async function getAllCustomerPlans(req, res) {
    try{
        const plans = await subscriptionModel.find({status:"pending"})
        let customerDet = new Array(plans.length)
        for(var i = 0;i<plans.length;i++){
            customerDet[i] = await customerModel.find({_id:plans[i].user_id},{name:1,contact:1,address:1})
        }
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