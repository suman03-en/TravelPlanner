import pool from '../config/db.js';
import { hashPassword } from '../utils/auth.js';


export const createUserTable= async()=>{
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );
        `;
        try{
            await pool.query(query);
            console.log("Users table created or already exists.");
        }catch(error){
            console.log("Error occured in db.",error);
        }
    };


export const insertUser = async(cd)=>{
    const hashedPassword = await hashPassword(cd.password);
    const query = `
    INSERT INTO users(name,email,password)
    VALUES($1,$2,$3)
    RETURNING user_id,name,email;
    `;
    const values = [cd.name,cd.email,hashedPassword];
    const result = await pool.query(query,values);
    return result.rows[0];
};

export const getCurrentUser = async(id)=>{
    const query = `
    SELECT user_id,name,email FROM users 
    WHERE user_id=$1;
    `
    const user = await pool.query(query,[id]);
    return user.rows[0];
}

export const getUserByEmail = async(email)=>{
    const query = `
    SELECT * FROM users
    WHERE email = $1;
    `;
    const user = await pool.query(query,[email]);
    return user.rows[0];
}
