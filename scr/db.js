const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', 
    port: '3306',  
    user: 'root',        
    password: '',
    database: 'Diskon'   
});

exports.query = async (sql, values = []) => {
    try{
        const [rows, fields] = await pool.query(sql, values);
        return rows;
    }catch (error) {
        console.error('Database querry error : ', error.message);
        throw error;
    }
    // try {
    //     const connection = await pool.getConnection();
    //     const result = await connection.query(sql, values); 
    //     connection.release();
    //     return result;
    // } catch (error) {
    //     throw error;
    // }
};
