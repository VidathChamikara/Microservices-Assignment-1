const mysql = require('mysql2');

let pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory'
});

const getConnection = (cb) => {
    pool.getConnection(function (err, connection) {
        if (err) {
            return console.error('error: ' + err.message);
        }
        if(cb){
            cb(connection);
        }
    });
    };

module.exports = {getConnection};