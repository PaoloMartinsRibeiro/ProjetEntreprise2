import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/GetAllServices", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', 
      },
    })
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des services : ", error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Numéro du service</th>
            <th>Libellé du service</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.idService}</td>
              <td>{service.libelleService}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;