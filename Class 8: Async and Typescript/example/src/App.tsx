import React, { useState } from "react";
import "./App.css";

const request = "https://www.breakingbadapi.com/api/quote/random";

const App: React.FC = () => {
  const [frase, cambiar] = useState("asdaasd");
  const changeIt = async () => {
    cambiar("...");
    const x = await fetch(request);
    const json = await x.json();
    cambiar(json[0].quote);
  };

  return (
    <div className="App">
      <button onClick={changeIt}>Obtener frase</button>
      <br />
      {frase}
    </div>
  );
};

export default App;
