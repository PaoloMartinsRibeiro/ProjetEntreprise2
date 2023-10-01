import React, { useState, useEffect } from "react";
import axios from "axios";

function Sites() {
  const [sites, setSites] = useState([]);
  const [editingSite, setEditingSite] = useState(null);
  const [editedVille, setEditedVille] = useState("");

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

  const handleEdit = (sites) => {
    setEditingSite(sites);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    axios
      .put(`http://localhost:8081/UpdateSite/${editingSite.idSite}`, {
        villeSite: editedVille,
      })
      .then((response) => {
        const updatedSites = sites.map((site) => {
          if (site.idSite === editingSite.idSite) {
            return { ...site, villeSite: editedVille };
          }
          return site;
        });
        setSites(updatedSites);
        setEditingSite(null);
        setEditedVille(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la ville : ", error);
      });
  };

  const handleDelete = (siteToDelete) => {
    axios
      .delete(`http://localhost:8081/DeleteSite/${siteToDelete.idSite}`)
      .then((response) => {
        const updatedSites = sites.filter((site) => site.idSite !== siteToDelete.idSite);
        setSites(updatedSites);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du site : ", error);
      });
  };
  

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
              <td>
                <button onClick={() => handleEdit(site)}>Modifier</button>
              </td>
              <td>
                <button onClick={() => handleDelete(site)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
        {editingSite && (
          <div>
            <h2>Modifier le site</h2>
            <form onSubmit={handleFormSubmit}>
            <label>
             Nouvelle ville :{" "}
            <input
            type="text"
            value={editedVille}
            onChange={(e) => setEditedVille(e.target.value)}
            />
            </label>
            <button type="submit">Enregistrer</button>
            </form>
          </div>
)}
      </table>
    </div>
  );
  
}

export default Sites;