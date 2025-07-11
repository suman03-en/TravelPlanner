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
    console.log("Document table created or already exists");

}

export const createDocument = async(cd)=>{
    const query = `
        INSERT INTO documents(trip_id,document_type,status)
        VALUES($1,$2,$3)
        RETURNING *;
    `;
    const values = Object.values(cd);
    const result = await pool.query(query,values);
    return result.rows[0];
}

export const getAllDocuments = async(trip_id)=>{

    const query = `
        SELECT document_id,document_type,status
        FROM documents 
        WHERE trip_id = $1;
    `;
    const result = await pool.query(query,[trip_id]);
    return result.rows;
}

export const deleteDocument = async(doc_id)=>{
    const query = `
        DELETE FROM documents
        WHERE document_id = $1
        RETURNING *;
    `;
    const result = await pool.query(query,[doc_id]);
    return result.rows[0];
}