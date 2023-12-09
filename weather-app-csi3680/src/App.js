import React from "react";
import WeatherDisplay from "./WeatherDisplay";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ textAlign: "center" }}>The Current Weather</h1>
        <WeatherDisplay />
      </header>
    </div>
  );
}

export default App;
