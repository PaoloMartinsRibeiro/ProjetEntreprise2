import React, { useState } from "react"
import axios from "axios"

function Search() {

    const [name, setname] = useState('')
    const [result, setresult] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:8081/SearchByName', {name})
        .then(res => {console.log(res)
            if(res.data === "Recherche réussie") {
                // Condition d'affichage du résultat
                result.map((result) => (
                    <tr key={result.id}>
                        <td>{result.nomSalarie}</td>
                        <td>{result.prenomSalarie}</td>
                        <td>{result.telephonefixeSalarie}</td>
                        <td>{result.telephoneportableSalarie}</td>
                        <td>{result.emailSalarie}</td>
                        <td>{result.serviceSalarie}</td>
                        <td>{result.siteSalarie}</td>
                    </tr>
                ))
            }
        })
        .catch(err => {console.log(err)})
    }

    return (
        <div className="form">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form_search">
                        <label htmlFor="nom">Recherche par nom</label>
                        <input type="name" placeholder="nom" onChange={e => setname(e.target.value)}/>
                    </div>
                    <button className="form_button">Effectuer la recherche</button>
                </form>
            </div>
        </div>
    )
}

export default Search