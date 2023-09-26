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
    password: "password",
    database: "projetcesi"
})

router.post('/login', (req, res) => {
    const sql = 'SELECT * FROM utilisateur WHERE name = ? AND password = ?'
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, [ req.body.username, req.body.password], (err, data) => {
        if (err) return res.send("Error")
        if(data.length > 0) {
            res.send("Login success")
        } else {
            res.send("Login failed")
        }
    })
})

router.post('/SearchByName', (req, res) => {
    const sql = 'SELECT * FROM salarie WHERE nomSalarie LIKE ? OR prenomSalarie LIKE ?';
    const searchTerm = `%${req.body.nom}%`; // Modifiez req.body.nom en fonction du nom du champ dans votre formulaire
    db.query(sql, [searchTerm, searchTerm], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erreur de recherche");
        }
        if (data.length > 0) {
            res.send("Recherche réussie");
        } else {
            res.send("Aucun résultat trouvé");
        }
    });
});
router.get('/GetAllSalaries', (req, res) => {
    const sql = 'SELECT * FROM salarie';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            console.error('Erreur lors de la récupération des employés :', err);
            res.status(500).send({ error: 'Une erreur s\'est produite lors de la récupération des employés.' });
        } else {
            res.send(result);
        }
    });
});

router.get('/GetAllServices', (req, res) => {
    const sql = 'Select * FROM service';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des services :', err);
            res.status(500).send({ error: 'Une erreur s\'est produite lors de la récupération des services.' });
        } else {
            res.send(result);
        }
    });
})

router.get('/GetAllSites', (req, res) => {
    const sql = 'Select * FROM site';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des sites :', err);
            res.status(500).send({ error: 'Une erreur s\'est produite lors de la récupération des sites.' });
        } else {
            res.send(result);
        }
    });
})



app.get('*', router)
app.post('*', router)
app.put('*', router)
app.delete('*', router)

app.listen(8081, () => {
    console.log('Listening on port 8081')
})

module.exports = router