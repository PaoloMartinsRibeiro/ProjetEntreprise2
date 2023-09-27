import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

function Search() {
  const [name, setname] = useState('');
  const [result, setresult] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const [selectedSite, setSelectedSite] = useState(0);


  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/SearchByName', { name })
      .then(res => {
        console.log(res.data);
        setresult(res.data);
        setSearched(true);
      })
      .catch(err => {
        console.error(err);
        setresult([]);
        setSearched(true);
      });
  }

  function handleSubmitService(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/SearchByService', { selectedService })
      .then(res => {
        console.log(res.data);
        setresult(res.data);
        setSearched(true);
      })
      .catch(err => {
        console.error(err);
        setresult([]);
        setSearched(true);
      });
  }

  function handleSubmitSite(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/SearchBySite', { selectedSite })
      .then(res => {
        console.log(res.data);
        setresult(res.data);
        setSearched(true);
      })
      .catch(err => {
        console.error(err);
        setresult([]);
        setSearched(true);
      });
  }

  return (

    <div className="form">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form_search">
            <label htmlFor="name">Recherche par nom</label>
            <input type="text" placeholder="name" onChange={e => setname(e.target.value)} />
          </div>
          <button className="form_button">Effectuer la recherche par nom</button>
        </form>


        <label htmlFor="service">Recherche par service</label>
    <select id="service" onChange={e => setSelectedService(e.target.value)}>
        <option value={1}>Comptabilité</option>
        <option value={2}>production</option>
        <option value={3}>accueil</option>
        <option value={4}>informatique</option>
        <option value={5}>commercial</option>
    </select>
    <button className="form_button" onClick={handleSubmitService}>Effectuer la recherche par service</button>


    <label htmlFor="site">Recherche par site</label>
    <select id="site" onChange={e => setSelectedSite(e.target.value)}>
        <option value={1}>Site Normandie</option>
        <option value={2}>Site IDF</option>
        <option value={3}>Site Hauts de France</option>
        <option value={4}>Site Nouvelle Aquitaine</option>
        <option value={5}>Site Occitanie</option>
    </select>
    <button className="form_button" onClick={handleSubmitSite}>Effectuer la recherche par site</button>

        {searched && (
         <div className="search-results">
            <h2>Résultats de la recherche :</h2>
            {result.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Téléphone Fixe</th>
                    <th>Téléphone Portable</th>
                    <th>Email</th>
                    <th>Service</th>
                    <th>Site</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nomSalarie}</td>
                      <td>{item.prenomSalarie}</td>
                      <td>{item.telephonefixeSalarie}</td>
                      <td>{item.telephoneportableSalarie}</td>
                      <td>{item.emailSalarie}</td>
                      <td>{item.serviceSalarie}</td>
                      <td>{item.siteSalarie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucun résultat trouvé.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;