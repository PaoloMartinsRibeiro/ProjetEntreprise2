import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");
  const [idService, setIdService] = useState(0);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [updatedLibelle, setUpdatedLibelle] = useState("");

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

  const handleInsertShow = () => {
    setShowInsertForm(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setUpdatedLibelle(service.libelleService);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8081/UpdateService/${editingService.idService}`, {
        updatedService: updatedLibelle,
      })
      .then((response) => {
        console.log("Service mis à jour avec succès");
        const updatedServices = services.map((service) =>
          service.idService === editingService.idService
            ? { ...service, libelleService: updatedLibelle }
            : service
        );
        setServices(updatedServices);
        setEditingService(null);
        setUpdatedLibelle("");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du service : ", error);
      });
  };

  const handleInsert = () => {
    axios
      .post("http://localhost:8081/CreateService", {
        idService: idService,
        libelleService: newService,
      })
      .then((response) => {
        console.log("Service inséré avec succès");
        const updatedServices = [...services, { idService, libelleService: newService }];
        setServices(updatedServices);
        setIdService(0);
        setNewService("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'insertion du service : ", error);
      });
  };

  const handleDelete = (idService) => {
    axios
      .delete(`http://localhost:8081/DeleteService/${idService}`)
      .then((response) => {
        const updatedServices = services.filter((service) => service.idService !== idService);
        setServices(updatedServices);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du service : ", error);
      });
  };

  return (
    <div className="container_service_div">
      <table>
        <thead>
          <tr>
            <th>Numéro du service</th>
            <th>Libellé du service</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.idService}>
              <td>{service.idService}</td>
              <td>{service.libelleService}</td>
              <td><button className="crud_button" onClick={handleInsertShow}>Ajouter</button></td>
              <td><button className="crud_button" onClick={() => handleEdit(service)}>Modifier</button></td>
              <td><button className="crud_button" onClick={() => handleDelete(service.idService)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingService && (
        <div>
          <h2>Modifier le service</h2>
          <label>
            Nouveau libellé du service :{" "}
            <input
              type="text"
              value={updatedLibelle}
              onChange={(e) => setUpdatedLibelle(e.target.value)}
            />
          </label>
          <button onClick={handleUpdate}>Mettre à jour</button>
        </div>
      )}

      {showInsertForm && (
        <div>
          <h2>Ajouter un nouveau service</h2>
          <label>
            ID du service :{" "}
            <input
              type="number"
              value={idService}
              onChange={(e) => setIdService(e.target.value)}
            />
          </label>
          <label>
            Libellé du service :{" "}
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
            />
          </label>
          <button onClick={handleInsert}>Ajouter</button>
        </div>
      )}
    </div>
  );
}

export default Services;