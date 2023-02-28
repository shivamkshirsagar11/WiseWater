import subscriptionModel from "../../models/subscriptionModel.js"
import {todayDate, todayDatePlusNDays} from "../../utility/Date.js";
import customerModel from "../../models/customerModel.js";
async function getDailyDelievery(req, res){
    try{
        const today = todayDate();
        const daily = await subscriptionModel.find({worker_id:req.userid, next_date: today})
        const customers = new Array(daily.length)
        for(var i=0; i<daily.length; i++){
            customers[i] = await customerModel.findOne({_id:daily[i].user_id})
        }
        console.log("from worker daily")
        console.log(daily);
            res.status(200).json({
                dailyOrd:daily,
                customers: customers
            })
    }catch(err){
        res.status(404).json({
            error:{
                errorMessage:["Internal Server Error"]
            }
        })
    }
}

async function delieverDaily(req, res){
    try{
        console.log(req.body)
        const {orderId} = req.body;
        console.log(orderId)
        const ord = await subscriptionModel.findOne({_id:orderId})
        if(ord === null){
            res.status(404).json({
                error:{
                    errorMessage:["No order found"]
                } 
            })
        }
        const {remaining_days} = ord;
        const tomorrow = todayDatePlusNDays(1);
        const updated = await subscriptionModel.updateOne({_id:orderId},{$set:{next_date:tomorrow, remaining_days:remaining_days-1}})
        console.log("in deliever order")
        console.log(updated);
        if(remaining_days - 1 === 0){
            const deleted = await subscriptionModel.deleteOne({orderId})
            if(deleted){
                console.log("order deleted")
            }
        }
        if(updated){
            res.status(200).json({
                updated:true
            })
        }
    }catch(e){
        console.log(e)
        res.status(404).json({
            error:{
                errorMessage:["Internal Server Error"]
            }
        })
    }
}

export {getDailyDelievery, delieverDaily}