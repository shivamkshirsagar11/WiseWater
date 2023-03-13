import subscriptionModel from "../../models/subscriptionModel.js";
import workerModel from "../../models/workerModel.js";
import { toIndianStandard } from "../../utility/Date.js";
async function getAllPlans(req, res){
    try{
        const allPlans = await subscriptionModel.find({user_id:req.userid});
        const workers = Array(allPlans.length);
        for (let i=0; i<workers.length; i++){
            workers[i] = await workerModel.findOne({_id:allPlans[i].worker_id});
        }
        if (allPlans.length > 0){
            res.status(200).json({
                found:true,
                plans:allPlans,
                workers:workers
            })
        }
        else{
            res.status(200).json({
                found:false,
                plans:[]
            })
        }

    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

async function AddPlans(req, res){
    try{
        const {subObj} = req.body;
        subObj.user_id = req.userid;
        subObj.status = "pending"
        subObj.worker_id = null;
        subObj.start_date = toIndianStandard(subObj.start_date)
        const addOne = await subscriptionModel.create({...subObj})
        if(addOne){
            res.status(200).json({
                added:true
            })
        }
        else{
            res.status(500).json({
                added:false
            })
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: {
                errorMessage: ['Interanl Server Error']
            }
        })
    }
}

export {getAllPlans, AddPlans};