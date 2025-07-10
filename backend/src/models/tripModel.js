import pool from "../config/db.js";


export const createTripTable = async()=>{
    const query = `
    CREATE TABLE IF NOT EXISTS trips (
    trip_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) on delete CASCADE,
    trip_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    notes TEXT,
    is_completed BOOLEAN DEFAULT FALSE
    );
    `;
    await pool.query(query);
    console.log("Trips table created or already exists");
}

export const createTrip = async(cd)=>{
    const query = `
    INSERT INTO trips(user_id, trip_name, location, start_date, end_date, notes, is_completed)
    VALUES($1,$2,$3,$4,$5,$6,$7)
    RETURNING trip_id,trip_name,location,start_date,end_date,notes,is_completed;
    `;
    const values = Object.values(cd);
    const result = await pool.query(query,values);
    return result.rows[0];

}

export const getTrip = async(user_id,trip_id)=>{
    const query = `
    SELECT trip_id,trip_name,location,start_date,end_date,notes,is_completed FROM trips
    WHERE user_id =$1 and trip_id = $2; 
    `;
    const values = [user_id,trip_id];
    const result = await pool.query(query,values);
    return result.rows[0];
}

export const getAllTrips = async(user_id)=>{
    const query = `
    SELECT trip_id,trip_name,location,start_date,end_date,notes,is_completed FROM trips
    WHERE user_id = $1;
    `;
    const values = [user_id];
    const result = await pool.query(query,values);
    return result.rows;
}

export const updateTrip = async(trip_data)=>{
    const query = `
    UPDATE trips
    SET trip_name = $2,
    location = $3,
    start_date = $4,
    end_date = $5,
    notes = $6,
    is_completed = $7
    WHERE trip_id = $1
    RETURNING *;
    `;
    const values = Object.values(trip_data);
    const result = await pool.query(query,values);
    return result.rows[0];
}


export const deleteTrip = async(trip_id)=>{
    const query = `
    DELETE FROM trips
    WHERE trip_id =$1
    RETURNING *;
    `;
    const values=[trip_id];
    const result = await pool.query(query,values);
    return result.rows[0];
}
