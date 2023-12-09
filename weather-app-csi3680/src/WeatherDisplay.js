import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_weather_data?city=${encodeURIComponent(
          city
        )}&state=${encodeURIComponent(state)}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      await fetchData();
    };

    fetchDataAndUpdateState();
  }, [city, state, fetchData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleFormSubmit} className="weather-form">
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>

      {weatherData ? (
        <div className="weather-info">
          <h2>
            Weather in {weatherData.location.name},{" "}
            {weatherData.location.region}, {weatherData.location.country}
          </h2>

          <div className="current-conditions">
            <h3>Current Conditions</h3>
            <ul>
              {Object.entries(weatherData.current).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </li>
              ))}
            </ul>
          </div>

          <div className="location-info">
            <h3>Location Information</h3>
            <ul>
              {Object.entries(weatherData.location).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {typeof value === "object" ? JSON.stringify(value) : value}
                </li>
              ))}
            </ul>
          </div>

          <MapContainer
            center={[weatherData.location.lat, weatherData.location.lon]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[weatherData.location.lat, weatherData.location.lon]}
            >
              <Popup>
                {weatherData.location.name}, {weatherData.location.region},{" "}
                {weatherData.location.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
