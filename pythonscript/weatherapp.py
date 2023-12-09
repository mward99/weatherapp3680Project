# Python Based: Requirement 1

# Practical Usage: weather app is practical for anyone who wants to know the weather




from flask import Flask, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)


# Defines and Use at Least Two Functions:


# Function 1: 
def get_weather_data(api_key, city, state, country):
    base_url = "http://api.weatherapi.com/v1/current.json" 
    location = f"{city},{state},{country}"
    params = {"q": location, "key": api_key, "units": "metric"} 

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        weather_data = response.json()
        print(f"API Response: {weather_data}")
        return weather_data
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Request Error: {err}")
    return None


# This is for the react app so we can see it in the UI
# Importing third-Party Library/Package, this is being used in the react app which is a third-part JS library 
@app.route('/get_weather_data', methods=['GET'])

# Function 2: 
def serve_weather_data():
    api_key = "848078c6e4754766ad811114230912"
    city_name = "Macomb"
    state_name = "Michigan"
    country_code = "US"
# Use Exceptions for File Operations: using try and catch block
    try:
        weather_data = get_weather_data(api_key, city_name, state_name, country_code)
        print(f"Weather Data: {weather_data}")
        return jsonify(weather_data)
    except Exception as e:
        print(f"Error serving weather data: {e}")
        # writing to a json file
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
