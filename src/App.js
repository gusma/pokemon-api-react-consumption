import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  // - Fetch `https://api.jsonbin.io/b/608c2722d64cd16802a55013` when the user writes in the input field
  // - Filter the results given user input, it can be searched by Name or one of its Types
  // - Results should be not more than 4 at any time.
  // - Sort elements first if the match the Name, then if they match the Type

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.jsonbin.io/b/608c2722d64cd16802a55013`)
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
  }, []);


  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" />
        <small>Sort by Maximum Combat Points</small>
      </label>
      <input type="text" className="input" placeholder="Pokemon or type" />
      {/* <div className="loader"></div> */}

      <ul className="suggestions">
        {items.length > 0 ?
          items.splice(0,5).map((pokemon) =>
              <li key={pokemon.Id}>
                {/* this is an example of an item */}
                <img
                  src={pokemon.img}
                  alt=""
                />
                <div className="info">
                  <h1>
                    <span className="hl">{pokemon.Name}</span>chu
            </h1>
                  <span className="type electric">{pokemon.Types.[0]}</span>
                  <span className="type normal">{pokemon.Types.[1]}</span>
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