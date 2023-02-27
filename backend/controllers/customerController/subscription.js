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
export {getAllPlans};