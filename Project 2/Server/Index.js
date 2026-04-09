const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student'
});
db.connect(err => {
    if (err) throw err;
    console.log(`Connected to MySQL Database`);
});

app.get('/users', (req, res) => {
    db.query('Select * from exam', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/users', (req, res) => {
    const { Subject, Exam_date } = req.body;
    db.query('Insert into exam (Subject,Exam_date) values (?,?)',[Subject,Exam_date],
        (err,result)=>{
            if (err) return res.status(500).json(err);
            res.status(201).json({id:result.insertId,Subject,Exam_date});   
        });
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
