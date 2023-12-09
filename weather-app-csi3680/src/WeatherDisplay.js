import React, { useState, useEffect } from "react";
import "./App.css";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_weather_data");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // At Least One File I/O Operation: we are able to read the data on the react app

    // Visualize Outcomes: we're able to see the outcomes on the react app
    <div className="weather-container">
      {weatherData ? (
        <div>
          <h2>
            Weather in {weatherData.location.name},{" "}
            {weatherData.location.region}, {weatherData.location.country}
          </h2>

          <div className="current-conditions">
            <h3>Current Conditions</h3>
            <ul>
              <li>
                <strong>Feels Like (C):</strong>{" "}
                {weatherData.current.feelslike_c}
              </li>
              <li>
                <strong>Feels Like (F):</strong>{" "}
                {weatherData.current.feelslike_f}
              </li>
              <li>
                <strong>Gust (kph):</strong> {weatherData.current.gust_kph}
              </li>
              <li>
                <strong>Gust (mph):</strong> {weatherData.current.gust_mph}
              </li>
              <li>
                <strong>Humidity:</strong> {weatherData.current.humidity}%
              </li>
              <li>
                <strong>Pressure (in):</strong>{" "}
                {weatherData.current.pressure_in}
              </li>
              <li>
                <strong>Pressure (mb):</strong>{" "}
                {weatherData.current.pressure_mb}
              </li>
              <li>
                <strong>Temperature (C):</strong> {weatherData.current.temp_c}
              </li>
              <li>
                <strong>Temperature (F):</strong> {weatherData.current.temp_f}
              </li>
              <li>
                <strong>UV:</strong> {weatherData.current.uv}
              </li>
              <li>
                <strong>Visibility (km):</strong> {weatherData.current.vis_km}
              </li>
              <li>
                <strong>Visibility (miles):</strong>{" "}
                {weatherData.current.vis_miles}
              </li>
              <li>
                <strong>Wind Degree:</strong> {weatherData.current.wind_degree}
              </li>
              <li>
                <strong>Wind Direction:</strong> {weatherData.current.wind_dir}
              </li>
              <li>
                <strong>Wind (kph):</strong> {weatherData.current.wind_kph}
              </li>
              <li>
                <strong>Wind (mph):</strong> {weatherData.current.wind_mph}
              </li>
            </ul>
          </div>

          <div className="location-info">
            <h3>Location Information</h3>
            <ul>
              <li>
                <strong>Country:</strong> {weatherData.location.country}
              </li>
              <li>
                <strong>Latitude:</strong> {weatherData.location.lat}
              </li>
              <li>
                <strong>Local Time:</strong> {weatherData.location.localtime}
              </li>
              <li>
                <strong>Local Time (Epoch):</strong>{" "}
                {weatherData.location.localtime_epoch}
              </li>
              <li>
                <strong>Longitude:</strong> {weatherData.location.lon}
              </li>
              <li>
                <strong>Name:</strong> {weatherData.location.name}
              </li>
              <li>
                <strong>Region:</strong> {weatherData.location.region}
              </li>
              <li>
                <strong>Timezone ID:</strong> {weatherData.location.tz_id}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
