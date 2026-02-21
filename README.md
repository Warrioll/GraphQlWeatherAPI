# GraphQL Weather API

API that provides data of current weather and air quality data based on address information or coordinates. It uses external APIs to get data and was created as a simple project for learning GraphQL API development.

# External APIs used

- Geocoding API (https://geocode.maps.co/)
- Open-Meteo (https://open-meteo.com/)
- Air Quality Open Data Platform (https://aqicn.org)

# How to run it

Node.js must be installed to run this API.

1. Clone this repository
2. Create a `.env` file containing the following variables:
   - `GEOCODE_MAPS_KEY` - value: your personal Geocoding API key (https://geocode.maps.co/)
   - `WAQI_KEY` -  value: your personal Air Quality Open Data Platform API token (https://aqicn.org/data-platform/token/)
3. Run to install packages:
  ```
npm install
  ```

4. Run API:
  ```
  npm run dev
  ```


