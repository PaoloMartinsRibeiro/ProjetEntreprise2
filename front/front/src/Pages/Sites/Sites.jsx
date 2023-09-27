import React, { useState, useEffect } from "react";
import axios from "axios";

function Sites() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/GetAllSites", {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', 
      },
    })
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des sites : ", error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Numéro du site</th>
            <th>Libellé du site</th>
            <th>Ville du site</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id}>
              <td>{site.idSite}</td>
              <td>{site.libelleSite}</td>
              <td>{site.villeSite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sites;