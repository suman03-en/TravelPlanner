import pool from '../config/db.js';


export const createPlanTable = async()=>{
    const query = `
    CREATE TABLE IF NOT EXISTS plans (
    plan_id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trips(trip_id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    budget_amount NUMERIC(10,2) NOT NULL
    );
    `;
    await pool.query(query);
    console.log("Plans table created or already exists");
}

export  const createPlan = async(cd)=>{
    const query = `
    INSERT INTO plans(trip_id,category,budget_amount)
    VALUES($1,$2,$3)
    RETURNING *;
    `;
    const values = Object.values(cd);
    const result = await pool.query(query,values);
    return result.rows[0];
}

export const getAllPlans = async(trip_id)=>{
    const query = `
        SELECT * FROM plans
        WHERE trip_id=$1;
    `;
    const result = await pool.query(query,[trip_id]);
    return result.rows;
}

export const deletePlan = async(plan_id,user_id) =>{
    const query = `
        DELETE FROM plans
        USING trips
        WHERE plans.trip_id = trips.trip_id
        AND plans.plan_id = $1
        AND trips.user_id = $2
        RETURNING plans .*;
    `;
    const result = await pool.query(query,[plan_id,user_id]);
    return result.rows[0];
}