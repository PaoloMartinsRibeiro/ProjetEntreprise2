const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const router = express.Router();

const app = express()
app.use(express.json())
app.use(cors())
const db = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "",
    database: "projetcesi"
})

router.post('/login', (req, res) => {
    const sql = 'SELECT * FROM utilisateur WHERE name = ? AND password = ?'
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, [ req.body.username, req.body.password], (err, data) => {
        if (err) return res.json("Error")
        if(data.length > 0) {
            res.json("Login success")
        } else {
            res.json("Login failed")
        }
    })
})

router.get('/GetAllSalaries', (req, res) => {
    const sql = 'SELECT * FROM salarie';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des employés :', err);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des employés.' });
        } else {
            res.json(result);
        }
    });
});




app.listen(8081, () => {
    console.log('Listening on port 8081')
})

module.exports = router