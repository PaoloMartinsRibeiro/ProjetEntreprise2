import React from "react"
import Salaries from "../Salaries/Salaries"
import Services from "../Services/Services"
import Sites from "../Sites/Sites"
import SearchButton from "../SearchButton/SearchButton"

function Home() {

    return (
        <div>
            <h1>Annuaire d'entreprise</h1>
            <SearchButton />
            <h2>Liste des salariés</h2>
            <Salaries />
            <h2>Liste des services</h2>
            <Services />
            <h2>Liste des sites</h2>
            <Sites />
        </div>
    )
    }

export default Home