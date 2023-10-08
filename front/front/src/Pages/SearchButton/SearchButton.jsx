import React from "react"
import "./SearchButton.css"

function SearchButton() {
    return (
            <button className="search_button" onClick={() => {
                window.location.href = "/Search"
            }}>Rechercher</button>
    )
}

export default SearchButton