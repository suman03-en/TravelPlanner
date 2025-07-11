import { createTrip,getAllTrips, getTrip,updateTrip ,deleteTrip} from "../models/tripModel.js";
import { CustomError } from "../utils/customError.js";

//create new trip 
export const createTripController = async (req,res,next)=>{
    const user_id = req.user.user_id;
    const cleaned_data = {
        user_id : user_id,
        trip_name : req.body.trip_name,
        location : req.body.location,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        notes : req.body.notes,
        is_completed : req.body.is_completed
    };

    try{
        const trip = await createTrip(cleaned_data);
        if(trip){
            return res.status(201).json({
                message:"Trip created successfully",
                trip:trip
            });
        }else{
            throw new CustomError("Failed to create trip.",400);
        }
    }catch(error){
        next(error);
    }
}

// returns all the trips of the current user 
export const getAllTripsController = async(req,res,next)=>{

    try{
        const user_id = req.user.user_id;
        const trips = await getAllTrips(user_id);

        return res.status(200).json(trips);

    }catch(error){
       next(error);
    }
}

export const getTripController = async (req,res,next)=>{
    const user_id = req.user.user_id;
    const trip_id = Number(req.params.id);

    try{
        const trip = await getTrip(user_id,trip_id);
        if(!trip){
            throw new CustomError("Unathorized or trip not found",404)
        }

        return res.status(200).json(trip);

    }catch(error){
        next(error);
    }
}


export const updateTripController = async(req,res,next)=>{
    const trip_id = Number(req.params.id);
    const updatedData = {
        trip_id : trip_id,
        trip_name:req.body.trip_name,
        location:req.body.location,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        notes:req.body.notes,
        is_completed:req.body.is_completed
    };
    try{
        const updatedTrip = await updateTrip(updatedData);
        if(updatedTrip){
            return res.status(200).json({
                message:"Trip updation successfull",
                trip:updatedTrip
            });
        }else{
            throw new CustomError("Failed to update trip",500);
        }
    }catch(error){
        next(error);
    }
}


export const deleteTripController = async(req,res)=>{
    const trip_id = Number(req.params.id)

    try{
        const deletedTrip = await deleteTrip(trip_id);
        return res.status(200).json({
            message:"Trip Deletion successfull.",
            trip:deletedTrip
        });
    }catch(error){
        next(error);
    }
}