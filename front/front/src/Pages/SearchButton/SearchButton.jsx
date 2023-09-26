import React from "react"

function SearchButton() {
    return (
        <div>
            <button onClick={() => {
                window.location.href = "/Search"
            }}>Rechercher</button>
        </div>
    )
}

export default SearchButton