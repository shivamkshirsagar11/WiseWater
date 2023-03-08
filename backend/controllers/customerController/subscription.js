import subscriptionModel from "../../models/subscriptionModel.js";

async function getAllPlans(req, res){
    try{
        const allPlans = await subscriptionModel.find({user_id:req.userid});
        console.log("from subscription all")
        console.log(allPlans);
        if (allPlans.length > 0){
            res.status(200).json({
                found:true,
                plans:allPlans
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
        const addOne = await subscriptionModel.create({...subObj})
        if(addOne){
            res.status(200).json({
                success:true
            })
        }
        else{
            res.status(500).json({
                success:false
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