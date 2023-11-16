const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_1'
})

module.exports = pool.promise();
