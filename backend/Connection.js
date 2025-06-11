const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "map_database",
});

db.connect((err) => {
    if (err) {
        console.log("Error connecting to database");
        return;
    }
    console.log("Connected to database");
});

db.query("Select * from student", (err, result) => {
    if (err) {
        console.log("Error fetching data from database");
        return;
    }
});

module.exports = db;


