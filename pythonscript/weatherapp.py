from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

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

@app.route('/get_weather_data', methods=['GET'])
def serve_weather_data():
    api_key = "848078c6e4754766ad811114230912"
    
    city_name = request.args.get('city')
    state_name = request.args.get('state')
    country_code = "US"

    try:
        weather_data = get_weather_data(api_key, city_name, state_name, country_code)
        print(f"Weather Data: {weather_data}")
        return jsonify(weather_data)
    except Exception as e:
        print(f"Error serving weather data: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
