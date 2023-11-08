const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '172.30.32.1',
    user: 'root',
    database: 'csmarket',
});

export default connection;