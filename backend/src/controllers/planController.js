import { createPlan, getAllPlans, deletePlan } from "../models/planModel.js";
import { CustomError } from "../utils/customError.js";

export const createPlanController = async (req, res) => {
  const trip_id = Number(req.params.id);
  const cleaned_data = {
    trip_id,
    category: req.body.category,
    budget_amount: req.body.budget_amount,
  };
  try {
    const plan = await createPlan(cleaned_data);
    if (!plan) {
      return next(new CustomError("Failed to create plan", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Plan created successfully",
      plan: plan,
    });
  } catch (error) {
    next(new CustomError(error.message || "Plan creation failed", 500));
  }
};

export const getPlansController = async (req, res, next) => {
  const trip_id = req.params.id;
  try {
    const plans = await getAllPlans(trip_id);
    return res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    next(new CustomError(error.message || "Failed to fetch plans", 500));
  }
};

export const deletePlanController = async (req, res, next) => {
  const user_id = req.user.user_id;
  const plan_id = Number(req.params.id);
  try {
    const plan = await deletePlan(plan_id, user_id);
    if (!plan) {
      return next(new CustomError("Unauthorized or plan not found", 401));
    }
    return res.status(200).json({
      success: true,
      message: "Plan deletion successful",
      plan,
    });
  } catch (error) {
    next(new CustomError(error.message || "Plan deletion failed", 500));
  }
};
