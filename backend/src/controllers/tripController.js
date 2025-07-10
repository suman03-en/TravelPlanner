import { createTrip,getAllTrips, getTrip,updateTrip ,deleteTrip} from "../models/tripModel.js";

//create new trip 
export const createTripController = async (req,res)=>{
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
            return res.status(400).json({
                error:"Failed to create trip."
            });
        }
    }catch(error){
        return res.status(500).json({error:error.message});
    }
}

// returns all the trips of the current user 
export const getAllTripsController = async(req,res)=>{

    try{
        const user_id = req.user.user_id;
        const trips = await getAllTrips(user_id);

        return res.status(200).json(trips);

    }catch(error){
        return res.status(500).json({
            error:"Internal server error",
            detail:error.message
        })
    }
}

export const getTripController = async (req,res)=>{
    const user_id = req.user.user_id;
    const trip_id = Number(req.params.id);
    if(isNaN(trip_id)){
        return res.status(400).json({
            error:"Invalid id"
        });
    }

    try{
        const trip = await getTrip(user_id,trip_id);
        if(!trip){
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);

    }catch(error){
        return res.status(404).json({
            error:error.message,
        });
    }
}


export const updateTripController = async(req,res)=>{
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
            return res.status(500).json({
                message:"Trip updation unsuccessfull"
            })
        }
    }catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}


export const deleteTripController = async(req,res)=>{
    const trip_id = Number(req.params.id)
    if(isNaN(trip_id)){
        return res.status(400).json({
            error:"Invalid trip id"
        });
    }
    try{
        const deletedTrip = await deleteTrip(trip_id);
        return res.status(200).json({
            message:"Trip Deletion successfull.",
            trip:deletedTrip
        });
    }catch(error){
        return res.status(500).json({
            error:error.message
        });
    }
}