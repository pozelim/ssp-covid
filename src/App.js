import React from "react";
import LineDeathSum from "./components/lineDeathSum";
import LineDeathPerDay from "./components/lineDeathPerDay";
import LineCaseSum from "./components/lineCaseSum";
import LineCasePerDay from "./components/lineCasePerDay";
import data from "./data/data.json";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2> São Sebastião do Paraíso COVID-19</h2>
      </header>
      <div className="App-block">
        <LineDeathSum data={data} />
      </div>
      <div className="App-block">
        <LineDeathPerDay data={data} />
      </div>
      <div className="App-block">
        <LineCaseSum data={data} />
      </div>
      <div className="App-block">
        <LineCasePerDay data={data} />
      </div>
      <footer className="App-footer">
        <span>
          Fonte:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/ssparaiso"
          >
            https://www.facebook.com/ssparaiso
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
