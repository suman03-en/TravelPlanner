import { createTrip,getAllTrips, getTrip,updateTrip ,deleteTrip} from "../models/tripModel.js";
import { CustomError } from "../utils/customError.js";

//create new trip 
export const createTripController = async (req,res,next)=>{
    const user_id = req.user.user_id;
    const cleaned_data = {
        user_id,
        trip_name : req.body.trip_name,
        location : req.body.location,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        notes : req.body.notes,
        is_completed : req.body.is_completed,
    };

    try{
        const trip = await createTrip(cleaned_data);
        if(!trip){
            return next(new CustomError("Failed to create trip.",400));
        }
        return res.status(201).json({
            success:true,
            message:"Trip created successfully",
            trip,
        });
    }catch(error){
        next(new CustomError(error.message || "Trip creation failed",500));
    }
};

// returns all the trips of the current user 
export const getAllTripsController = async(req,res,next)=>{
    try{
        const user_id = req.user.user_id;
        const trips = await getAllTrips(user_id);
        return res.status(200).json({
            success:true,
            trips,
        });
    }catch(error){
       next(new CustomError(error.message || "Failed to fetch trips",500));
    }
};

export const getTripController = async (req,res,next)=>{
    const user_id = req.user.user_id;
    const trip_id = Number(req.params.id);
    try{
        const trip = await getTrip(user_id,trip_id);
        if(!trip){
            return next(new CustomError("Unathorized or trip not found",404));
        }
        return res.status(200).json({
            success:true,
            trip,
        });
    }catch(error){
        next(new CustomError(error.message || "Failed to fetch trip",500));
    }
};


export const updateTripController = async(req,res,next)=>{
    const trip_id = Number(req.params.id);
    const updatedData = {
        trip_id,
        trip_name:req.body.trip_name,
        location:req.body.location,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        notes:req.body.notes,
        is_completed:req.body.is_completed
    };
    try{
        const updatedTrip = await updateTrip(updatedData);
        if(!updatedTrip){
            return next(new CustomError("Failed to update trip", 500));
        }
        return res.status(200).json({
            success: true,
            message: "Trip update successful",
            trip:updatedTrip,
        });
    }catch(error){
        next(new CustomError(error.message || "Trip update failed",500));
    }
};


export const deleteTripController = async(req,res,next)=>{
    const trip_id = Number(req.params.id)
    try{
        const deletedTrip = await deleteTrip(trip_id);
        if(!deletedTrip){
            return next(new CustomError("Trip not found or already deleted",404));
        }
        return res.status(200).json({
            success:true,
            message:"Trip Deletion successfull.",
            trip:deletedTrip
        });
    }catch(error){
        next(new CustomError(error.message || "Trip deletion failed",500));
    }
};