import express from "express";
import mysql from "mysql2";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 5000;
const mysqlUser = process.env.REACT_APP_MYSQL_USER;
const mysqlPass = process.env.REACT_APP_MYSQL_PASS;

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: mysqlUser,
    password: mysqlPass,
    database: "bookstore"
}); 

app.get("/", (req, res) => {
    res.json(`server is running on port ${port}.  BOOM BABY!!!`)
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(port, () => {
    console.log(`server is running on port ${port}.  BOOM BABY!!!`)
})