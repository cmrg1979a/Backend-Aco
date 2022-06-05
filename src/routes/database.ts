import mysql from 'mysql2';

export async function connect(){
    const connection = await mysql.createPool({
        host: '10.116.0.2',
        user: 'admin',
        password: '@Developer2021Pic',
        database: 'db_op_main_01',
        waitForConnections: true,
    });
    return connection;
}
/*export async function connect(){
    const connection = await mysql.createPool({
        host: '157.230.14.98',
        user: 'admin',
        password: '@Developer2021Pic',
        database: 'db_op_main_01',
        port: 3306,
        waitForConnections: true,
    });
    return connection;
}*/


/*export async function connect(){
    const connection = await mysql.createPool({
        host: '67.205.129.62',
        user: 'root',
        password: 'K4n3l1t42+',
        database: 'db_op_main_01',
        port: 3306,
        waitForConnections: true,
    });
    return connection;
}*/