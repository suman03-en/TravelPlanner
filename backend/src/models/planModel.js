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

export const deletePlan = async(plan_id) =>{
    const query = `
        DELETE FROM plans
        WHERE plan_id = $1
        RETURNING *;
    `;
    const result = await pool.query(query,[plan_id]);
    return result.rows[0];
}