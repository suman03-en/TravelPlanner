import pool from '../config/db.js';

export const createDocumentTable = async()=>{
    const query = `
    CREATE TABLE IF NOT EXISTS documents(
    document_id SERIAL PRIMARY KEY,
    trip_id INT NOT NULL REFERENCES trips(trip_id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL
    );
    `;
    await pool.query(query);

}