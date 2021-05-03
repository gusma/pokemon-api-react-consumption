import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  // - Fetch `https://api.jsonbin.io/b/608c2722d64cd16802a55013` when the user writes in the input field
  // - Filter the results given user input, it can be searched by Name or one of its Types
  // - Results should be not more than 4 at any time.
  // - Sort elements first if the match the Name, then if they match the Type

  const [items, setItems] = useState([]);
  const [query, setQuery] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.jsonbin.io/b/608c2722d64cd16802a55013`)
      .then((res) => {
        setItems(res.data);
      })
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <input type="text" className="input" placeholder="Pokemon or type" onChange={event => setQuery(capitalizeFirstLetter(event.target.value))} />
      <ul className="suggestions">
        {items.length > 0 ?
          items
            .filter(searchTerm => searchTerm.Name.includes(query) || searchTerm.Types.includes(query))
            .splice(0, 4)
            .map((pokemon) =>
              <li key={pokemon.Id}>
                <img src={pokemon.img} alt={pokemon.Name} />
                <div className="info">
                  <h1>
                    <span className="hl">{pokemon.Name}</span>
                  </h1>
                  <span className={"type " + pokemon.Types.[0].toLowerCase()}>{pokemon.Types.[0]}</span>
                  {pokemon.Types.[1] && <span className={"type " + pokemon.Types.[1].toLowerCase()}>{pokemon.Types.[1]}</span>}
                </div>
              </li>)
          :
          <li>
            <div className="info">
              <h1 className="no-results">No results</h1>
            </div>
          </li>}
      </ul>
    </>
  );
}

export default App;
