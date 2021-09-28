
const mysql = require('mysql')

const dbCon = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '12345',
database: 'DB_Excel_Finance' 
});

module.exports = dbCon;