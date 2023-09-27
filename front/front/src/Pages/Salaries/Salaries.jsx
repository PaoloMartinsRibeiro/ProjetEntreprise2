import React, { useState, useEffect } from "react";
import axios from "axios";

function Salaries() {
  const [salaries, setSalaries] = useState([]);

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

  return (
    <div>
      <table>
        <thead>
          <tr>
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
              <td>{salary.nomSalarie}</td>
              <td>{salary.prenomSalarie}</td>
              <td>{salary.telephonefixeSalarie}</td>
              <td>{salary.telephoneportableSalarie}</td>
              <td>{salary.emailSalarie}</td>
              <td>{salary.serviceSalarie}</td>
              <td>{salary.siteSalarie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Salaries;