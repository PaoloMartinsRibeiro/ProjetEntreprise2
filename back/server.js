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
    const searchTerm = `%${req.body.name}%`;
    db.query(sql, [searchTerm, searchTerm], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erreur de recherche" }); 
        }
        res.json(data); 
    });
});

router.post('/SearchByService', (req, res) => {
    const sql = 'SELECT * FROM salarie WHERE serviceSalarie = ?';
    const selectedService = req.body.selectedService; 
    db.query(sql, [selectedService], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erreur de recherche" }); 
        }
        res.json(data); 
    });
});

router.post('/SearchBySite', (req, res) => {
    const sql = 'SELECT * FROM salarie WHERE siteSalarie = ?';
    const selectedSite = req.body.selectedSite; 
    db.query(sql, [selectedSite], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erreur de recherche" }); 
        }
        res.json(data); 
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

router.put("/UpdateSite/:id", (req, res) => {
    const siteId = req.params.idSite;
    const updatedVille = req.body.villeSite;
    const sql = "UPDATE site SET villeSite = ? WHERE idSite = ?";
    db.query(sql, [updatedVille, siteId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la ville : ", err);
        return res.status(500).json({ error: "Erreur lors de la mise à jour de la ville" });
      }
      console.log("Site mis à jour avec succès");
      return res.json({ message: "Site mis à jour avec succès" });
    });
  });
  

router.delete("/DeleteSite/:id", (req, res) => {
    const siteId = req.params.id;
    const sql = "DELETE FROM site WHERE idSite = ?";
    console.log(req.params.idSite);
    db.query(sql, [siteId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du site : ", err);
        return res.status(500).json({ error: "Erreur lors de la suppression du site" });
      }
      console.log("Site supprimé avec succès");
      return res.json({ message: "Site supprimé avec succès" });
    });
});

router.post("/CreateService", (req, res) => {
    const sql = "INSERT INTO service (idService, libelleService) VALUES (?,?)";
    const idService = req.body.idService;
    const newService = req.body.libelleService;
    db.query(sql, [idService, newService], (err, result) => {
      if (err) {
        console.error("Erreur lors de la création du service : ", err);
        return res.status(500).json({ error: "Erreur lors de la création du service" });
      }
      console.log("Service créé avec succès");
      return res.json({ message: "Service créé avec succès" });
    });
  }
);

router.delete("/DeleteService/:id", (req, res) => {
    const serviceId = req.params.id;
    const sql = "DELETE FROM service WHERE idService = ?";
    db.query(sql, [serviceId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du service : ", err);
        return res.status(500).json({ error: "Erreur lors de la suppression du service" });
      }
      return res.json({ message: "Service supprimé avec succès" });
    });
  });

router.put("/UpdateService/:id", (req, res) => {
    const serviceId = req.params.id;
    const updatedService = req.body.updatedService;
    const sql = "UPDATE service SET libelleService = ? WHERE idService = ?";
    db.query(sql, [updatedService, serviceId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du service : ", err);
        return res.status(500).json({ error: "Erreur lors de la mise à jour du service" });
      }
      console.log("Service mis à jour avec succès");
      return res.json({ message: "Service mis à jour avec succès" });
    });
  });

  router.post("/CreateSalarie", (req, res) => {
    const sql = "INSERT INTO salarie (idSalarie, nomSalarie, prenomSalarie, telephonefixeSalarie, telephoneportableSalarie, emailSalarie, serviceSalarie, siteSalarie) VALUES (?,?,?,?,?,?,?,?)";
    const idSalarie = req.body.idSalarie;
    const nomSalarie = req.body.nomSalarie;
    const prenomSalarie = req.body.prenomSalarie;
    const telFixeSalarie = req.body.telephonefixeSalarie;
    const telportableSalarie = req.body.telephoneportableSalarie;
    const emailSalarie = req.body.emailSalarie;
    const serviceSalarie = req.body.serviceSalarie;
    const siteSalarie = req.body.siteSalarie;
    db.query(sql, [idSalarie, nomSalarie, prenomSalarie,telFixeSalarie,telportableSalarie,emailSalarie, serviceSalarie, siteSalarie], (err, result) => {
      if (err) {
        console.error("Erreur lors de la création du salarié : ", err);
        return res.status(500).json({ error: "Erreur lors de la création du salarié" });
      }
      console.log("Salarié créé avec succès");
      return res.json({result});
    });
  });

router.delete("/DeleteSalarie/:id", (req, res) => {
    const salarieId = req.params.id;
    const sql = "DELETE FROM salarie WHERE idSalarie = ?";
    db.query(sql, [salarieId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du salarié : ", err);
        return res.status(500).json({ error: "Erreur lors de la suppression du salarié" });
      }
      return res.json({ message: "Salarié supprimé avec succès" });
    });
  });

router.put("/UpdateSalarie/:id", (req, res) => {
    const salarieId = req.params.id;
    const updatedSalarie = req.body.updatedSalarie;
    const sql = "UPDATE salarie SET nomSalarie = ?, prenomSalarie = ?, telephonefixeSalarie = ?, telephoneportableSalarie = ?, emailSalarie = ?, serviceSalarie = ?, siteSalarie = ? WHERE idSalarie = ?";
    db.query(sql, [updatedSalarie.nomSalarie, updatedSalarie.prenomSalarie, updatedSalarie.telephonefixeSalarie, updatedSalarie.telephoneportableSalarie, updatedSalarie.emailSalarie, updatedSalarie.serviceSalarie, updatedSalarie.siteSalarie, salarieId], (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour du salarié : ", err);
        return res.status(500).json({ error: "Erreur lors de la mise à jour du salarié" });
      }
      console.log("Salarié mis à jour avec succès");
      return res.json({ message: "Salarié mis à jour avec succès" });
    });
  });

app.get('*', router)
app.post('*', router)
app.put('*', router)
app.delete('*', router)

app.listen(8081, () => {
    console.log('Listening on port 8081')
})

module.exports = router