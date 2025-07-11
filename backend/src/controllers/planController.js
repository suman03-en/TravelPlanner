import { createPlan, getAllPlans, deletePlan } from "../models/planModel.js";
import { CustomError } from "../utils/customError.js";

export const createPlanController = async (req,res)=>{
    const trip_id = Number(req.params.id);

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
        next(error);
    }
}

export const getPlansController = async(req,res,next)=>{
    const trip_id = Number(req.params.id);
    
    try{
        const plans = await getAllPlans(trip_id);
        return res.status(200).json(plans);
    }catch(error){
        next(error);
    }
}

export const deletePlanController = async(req,res,next)=>{
    const user_id = req.user.user_id;
    const plan_id = Number(req.params.id);
    try{
        const plan = await deletePlan(plan_id,user_id);
        if(plan){
            return res.status(200).json({
                message:"Successful deletion",
                plan : plan
            });
        }else{
            throw new CustomError("Unauthorised or plan not found");
        }

    }catch(error){
        next(error);
    }

}