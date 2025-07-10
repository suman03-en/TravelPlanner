import { createPlan, getAllPlans } from "../models/planModel.js";


export const createPlanController = async (req,res)=>{
    const trip_id = Number(req.params.id);
    if(isNaN(trip_id)) return res.status(400).json({error:"Invalid id"});

    try{

        const cleaned_data ={
            trip_id:trip_id,
            category:req.body.category,
            budget_amount:req.body.budget_amount
        };

        const plan = await createPlan(cleaned_data);
        return res.status(200).json({
            "message":"Plan created successfully",
            plan:plan
        });

    }catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}

export const getPlansController = async(req,res)=>{
    const trip_id = Number(req.params.id);
    if(isNaN(trip_id)) return res.status(400).json({error:"Invalid id"});
    
    try{
        const plans = await getAllPlans(trip_id);
        return res.status(200).json(plans);
    }catch(error){
        return res.status(500).json({
            error:error.message
        });
    }


}