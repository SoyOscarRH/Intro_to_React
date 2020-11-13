import React, { useState, useEffect } from "react";
import Card from "./Card";
import getData from "./getData"
import "./App.css";
const base = "https://pokeapi.co/api/v2/pokemon?limit=151";

const App: React.FC = () => {
  const [pokemons, changePokemons] = useState([] as Array<any>);
  const getBase = async () => {
    const data = await getData(base);
    changePokemons(data.results);
  };

  useEffect(() => {
    getBase();
  }, []);

  return (
    <main className="App">
      {pokemons.map(poke => (
        <Card name={poke.name} url={poke.url} />
      ))}
    </main>
  );
};

export default App;
