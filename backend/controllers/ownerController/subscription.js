import subscriptionModel from "../../models/subscriptionModel.js";
import customerModel from "../../models/customerModel.js";
import workerModel from "../../models/workerModel.js";
import {todayDatePlusNDays} from "../../utility/Date.js"
import ownerModel from "../../models/ownerModel.js";
async function getAllCustomerPlans(req, res) {
    try{
        console.log("from subscriptioin")
        console.log(req.userid);
        const owner = await ownerModel.findById({_id:req.userid._id});
        console.log(owner);
        const plans = await subscriptionModel.find({status:"pending",company_name:owner.company_name});
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

async function assignPlan(req, res) {
    try{
        const tomorrow = todayDatePlusNDays(1);
        
        const {worker_id, order_id} = req.body;

        const order = await subscriptionModel.findOne({ order_id });

		if (null === order) {
			res.status(404).json({
				error: {
					errorMessage: ['Error or getting item']
				}
			})
		}
        console.log(order_id, order)
        const updatedSubscription = await subscriptionModel.updateOne({order_id},{$set:{
            worker_id:worker_id,
            status:"assigned",
            next_date:tomorrow
        }})
        console.log(updatedSubscription)
        if (updatedSubscription){
            res.status(200).json({
                updated:true
            })
        }
        else{
            res.status(500).json({
                error:{
                    errorMessage: ["Internal Server Error"]
                }
            }) 
        }
    }catch(error){
        res.status(500).json({
            error:{
                errorMessage: ["Internal Server Error"]
            }
        })
    }
}

async function getAllAssignedCustomerPlans(req, res) {
    try{
        const plans = await subscriptionModel.find({status:"assigned"})
        let customerDet = new Array(plans.length)
        let workerDet = new Array(plans.length)
        for(var i = 0;i<plans.length;i++){
            customerDet[i] = await customerModel.findOne({_id:plans[i].user_id},{firstname:1,lastname:1,contact:1,address:1})
        }
        for(var i = 0;i<plans.length;i++){
            workerDet[i] = await workerModel.findOne({_id:plans[i].worker_id},{firstname:1,lastname:1,contact:1,address:1})
        }
        res.status(200).json({
            plans:plans,
            customers:customerDet,
            workers:workerDet
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

export {getAllCustomerPlans, assignPlan, getAllAssignedCustomerPlans};