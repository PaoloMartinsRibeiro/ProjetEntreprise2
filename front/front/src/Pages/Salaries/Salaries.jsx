import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Salaries.css";

function Salaries() {
  const [salaries, setSalaries] = useState([]);

  const [idSalarie, setIdSalarie] = useState();
  const [nomSalarie, setNomSalarie] = useState("");
  const [prenomSalarie, setPrenomSalarie] = useState("");
  const [telephonefixeSalarie, setTelephonefixeSalarie] = useState();
  const [telephoneportableSalarie, setTelephoneportableSalarie] = useState();
  const [emailSalarie, setEmailSalarie] = useState("");
  const [serviceSalarie, setServiceSalarie] = useState();
  const [siteSalarie, setSiteSalarie] = useState();
  const [showInsertForm, setShowInsertForm] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentSalarie, setCurrentSalarie] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8081/GetAllSalaries", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', 
      },
    })
      .then((response) => {
        setSalaries(response.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des salaires : ", error);
      });
  }, []);

  const handleForm = () => {
    setShowInsertForm(true);
  }
  const newSalarie = {
    idSalarie: idSalarie,
    nomSalarie: nomSalarie,
    prenomSalarie: prenomSalarie,
    telephonefixeSalarie: telephonefixeSalarie,
    telephoneportableSalarie: telephoneportableSalarie,
    emailSalarie: emailSalarie,
    serviceSalarie: serviceSalarie,
    siteSalarie: siteSalarie
  };

  const handleInsertSalaries = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/CreateSalarie", newSalarie)
      .then((response) => {
        console.log("Salarié ajouté avec succès !");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de l'ajout du salarié : ", error);
      });
  };

  const handleDeleteSalaries = (id) => {
    axios.delete(`http://localhost:8081/DeleteSalarie/${id}`)
      .then((response) => {
        console.log("Salarié supprimé avec succès !");
        setSalaries(salaries.filter(salarie => salarie.id !== id));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la suppression du salarié : ", error);
      });
  };

  const handleUpdateSalaries = (id, updatedSalarie) => {
    axios.put(`http://localhost:8081/UpdateSalarie/${id}`, { updatedSalarie })
      .then((response) => {
        console.log("Salarié mis à jour avec succès !");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la mise à jour du salarié : ", error);
      });
  };

  const showUpdateFormForSalarie = (salarie) => {
    setCurrentSalarie(salarie);
    setShowUpdateForm(true);
  };

  return (
    <div className="container_salarie_div">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone fixe</th>
            <th>Téléphone portable</th>
            <th>Email</th>
            <th>Numéro de service</th>
            <th>Numéro de site</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.id}>
              <td>{salary.idSalarie}</td>
              <td>{salary.nomSalarie}</td>
              <td>{salary.prenomSalarie}</td>
              <td>{salary.telephonefixeSalarie}</td>
              <td>{salary.telephoneportableSalarie}</td>
              <td>{salary.emailSalarie}</td>
              <td>{salary.serviceSalarie}</td>
              <td>{salary.siteSalarie}</td>
              <td><button className="crud_button" onClick={handleForm}>Ajouter</button></td>
              <td><button className="crud_button" onClick={() => showUpdateFormForSalarie(salary)}>Modifier</button></td>
              <td><button className="crud_button" onClick={() => handleDeleteSalaries(salary.idSalarie)}>Suprrimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showInsertForm && (
        <div>
          <h2>Ajouter un nouveau salarie</h2>
          <label>
            ID du salarie :{" "}
            <input
              type="number"
              value={idSalarie}
              onChange={(e) => setIdSalarie(e.target.value)}
            />
          </label>
          <label>
            Nom du salarie :{" "}
            <input
              type="text"
              value={nomSalarie}
              onChange={(e) => setNomSalarie(e.target.value)}
            />
          </label>
          <label>
            Prénom du salarie :{" "}
            <input
              type="text"
              value={prenomSalarie}
              onChange={(e) => setPrenomSalarie(e.target.value)}
            />
          </label>
          <label>
            Telephone fixe du salarie :{" "}
            <input
              type="number"
              value={telephonefixeSalarie}
              onChange={(e) => setTelephonefixeSalarie(e.target.value)}
            />
          </label>
          <label>
            Telephone portable du salarie :{" "}
            <input
              type="number"
              value={telephoneportableSalarie}
              onChange={(e) => setTelephoneportableSalarie(e.target.value)}
            />
          </label>
          <label>
            Email du salarie :{" "}
            <input
              type="text"
              value={emailSalarie}
              onChange={(e) => setEmailSalarie(e.target.value)}
            />
          </label>
          <label>
            Service du salarie :{" "}
            <input
              type="number"
              value={serviceSalarie}
              onChange={(e) => setServiceSalarie(e.target.value)}
            />
          </label>
          <label>
            Site du salarie :{" "}
            <input
              type="number"
              value={siteSalarie}
              onChange={(e) => setSiteSalarie(e.target.value)}
            />
          </label>

          <button onClick={handleInsertSalaries}>Ajouter</button>
        </div>
      )}

      {showUpdateForm && (
        <div>
          <h2>Mettre à jour le salarié</h2>
          <label>
            ID du salarie : 
            <input
              type="number"
              value={idSalarie}
              onChange={(e) => setIdSalarie(e.target.value)}
              defaultValue={currentSalarie.idSalarie}
              disabled // généralement, l'ID ne devrait pas être modifié
            />
          </label>

          <label>
            Nom du salarie : 
            <input
              type="text"
              value={nomSalarie}
              onChange={(e) => setNomSalarie(e.target.value)}
              defaultValue={currentSalarie.nomSalarie}
            />
          </label>

          <label>
            Prénom du salarie : 
            <input
              type="text"
              value={prenomSalarie}
              onChange={(e) => setPrenomSalarie(e.target.value)}
              defaultValue={currentSalarie.prenomSalarie}
            />
          </label>

          <label>
            Telephone fixe du salarie : 
            <input
              type="number"
              value={telephonefixeSalarie}
              onChange={(e) => setTelephonefixeSalarie(e.target.value)}
              defaultValue={currentSalarie.telephonefixeSalarie}
            />
          </label>

          <label>
            Telephone portable du salarie : 
            <input
              type="number"
              value={telephoneportableSalarie}
              onChange={(e) => setTelephoneportableSalarie(e.target.value)}
              defaultValue={currentSalarie.telephoneportableSalarie}
            />
          </label>

          <label>
            Email du salarie : 
            <input
              type="text"
              value={emailSalarie}
              onChange={(e) => setEmailSalarie(e.target.value)}
              defaultValue={currentSalarie.emailSalarie}
            />
          </label>

          <label>
            Service du salarie : 
            <input
              type="number"
              value={serviceSalarie}
              onChange={(e) => setServiceSalarie(e.target.value)}
              defaultValue={currentSalarie.serviceSalarie}
            />
          </label>

          <label>
            Site du salarie : 
            <input
              type="number"
              value={siteSalarie}
              onChange={(e) => setSiteSalarie(e.target.value)}
              defaultValue={currentSalarie.siteSalarie}
            />
          </label>

          <button onClick={() => handleUpdateSalaries(currentSalarie.idSalarie, {
            nomSalarie: nomSalarie,
            prenomSalarie: prenomSalarie,
            telephonefixeSalarie: telephonefixeSalarie,
            telephoneportableSalarie: telephoneportableSalarie,
            emailSalarie: emailSalarie,
            serviceSalarie: serviceSalarie,
            siteSalarie: siteSalarie
          })}>Mettre à jour</button>

          <button onClick={() => setShowUpdateForm(false)}>Annuler</button>
        </div>
      )}

    </div>
  );
}

export default Salaries;