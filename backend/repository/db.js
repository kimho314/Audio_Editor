const mysql = require('mysql2/promise');
const dbConfig = require("../config/dbconfig");

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    connectionLimit: 10
});

const result = async (query, params) => {
    const conn = await pool.getConnection();

    try {
        const [rows, fields] = await conn.query(query, Object.values(params));
        return rows;
    } catch (e) {
        throw new Error(e);
    } finally {
        conn.release(); // release pool
    }
}

module.exports = result;