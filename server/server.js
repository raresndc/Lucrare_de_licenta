//backend api
const express = require("express");
const app = express();
const mysql = require("mysql");
var connection = require("./database");

const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  database: "appdb1",
  user: "root",
  password: "Licentacurier23",
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let userType;

  // Verificăm tipul utilizatorului în funcție de domeniul adresei de email
  if (email.includes("@courier.com")) {
    userType = "courier";
  } else if (email.includes("@dispatcher.com")) {
    userType = "dispatcher";
  } else if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
    userType = "client";
  } else {
    return res.json("Invalid email format");
  }

  // Realizăm interogarea în funcție de tipul utilizatorului
  const sql = `SELECT * FROM ${userType}s WHERE MAIL = ? AND PASSWORD = ?`;
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error!");
    }

    if (data.length > 0) {
      return res.json("Successful Login!");
    } else {
      return res.json("No record!");
    }
  });
});

app.post("/signup", (req, res) => {
    // Obține adresa de e-mail din cererea POST
    const email = req.body.email;
  
    // Verifică tipul de utilizator pe baza adresei de e-mail
    let tableName;
    if (email.endsWith("@dispatcher.com")) {
      tableName = "dispatchers";
    } else if (email.endsWith("@courier.com")) {
      tableName = "couriers";
    } else if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com")) {
      tableName = "clients";
    } else {
      // Adresă de e-mail nevalidă
      return res.json("Invalid email address");
    }
  
    // Construiește interogarea SQL în funcție de tabela corespunzătoare
    const sql = `INSERT INTO ${tableName} (LastName, FirstName, Phone, Username, Password, Mail) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      req.body.lastName,
      req.body.firstName,
      req.body.phone,
      req.body.username,
      req.body.password,
      email,
    ];
  
    // Execută interogarea SQL
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        return res.json("Error");
      }
  
      console.log("Registered successfully!");
      return res.json("Success");
    });
  });
  

// app.get("/", (req, res) => {
//     let sql = 'SELECT * FROM CLIENTS';
//     connection.query(sql, function(err, results){
//         if (err) throw err;
//         res.send(results);
//     });
// })

app.listen(5050, () => {
  console.log("Server started on port 5050");
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Database connected!");
  });
});
