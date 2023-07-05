var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'appdb1',
    user: 'root',
    password: 'Licentacurier23'
});

module.exports = connection;