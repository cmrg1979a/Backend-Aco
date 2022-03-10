import mysql from 'mysql2';

export async function connect(){
    const connection = await mysql.createPool({
        host: '157.230.14.98',
        user: 'admin',
        password: '@Developer2021Pic',
        database: 'db_op_main_01',
        waitForConnections: true,
    });
    return connection;
}