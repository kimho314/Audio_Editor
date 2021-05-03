const mysql = require("mysql");
const dbConfig = require("../config/dbconfig");

// create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open the MySQL conneciton
connection.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the database");
});

module.exports = connection;