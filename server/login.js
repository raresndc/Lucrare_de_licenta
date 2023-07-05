const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    database: 'appdb1',
    user: 'root',
    password: 'Licentacurier23'
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM COURIERS WHERE USERNAME = ? AND PASSWORD = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Login Failed!");
        return res.json(data);
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000...');
})