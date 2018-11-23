//require('./app.dotenv').config();

const mysql = require('mysql');
let connection;


if (process.env.NODE_ENV === 'production') {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        port: process.env.DB_PORT || 3306,
        host: process.env.DB_HOST || `localhost`,
        password: process.env.DB_PASSWORD || `root`,
        database: process.env.DB_DATABASE || `burger_db`,
        user: process.env.DB_USER || `root`,
    });
}
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports=connection;


