import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;
const mysqlUser = process.env.REACT_APP_MYSQL_USER;
const mysqlPass = process.env.REACT_APP_MYSQL_PASS;

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: mysqlUser,
  password: mysqlPass,
  database: "bookstore",
});

// if there is a auth problem
// ALTER USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'clee';

app.get("/", (req, res) => {
  res.json(`server is running on port ${port}.  BOOM BABY!!!`);
});

//show all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  });
});

//create new book
app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if(err) return res.send(err);
      return res.json(data);
    });
  });

//delete book from db
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if(err) return res.send(err);
    return res.json(data);
  });
});

//update book info
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values, bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}.  BOOM BABY!!!`);
});
