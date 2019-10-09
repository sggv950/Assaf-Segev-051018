const axios = require("axios");

const WEATHER_API_KEY = "b6iAGlImmrKQsOCsZmtYez2EZaBO84Ni";
const GEOPOSITION_URL =
  "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
const AUTOCOMPLETE_URL =
  "https://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const CURRENT_FORECAST_URL =
  "https://dataservice.accuweather.com/currentconditions/v1";
const FIVE_DAYS_FORECAST_URL =
  "https://dataservice.accuweather.com/forecasts/v1/daily/5day";

function getCitiesAutocomplete(input) {
  const reqUrl = `${AUTOCOMPLETE_URL}?q=${input}&apikey=${WEATHER_API_KEY}`;
  return axios.get(reqUrl).then(res => res.data);
}

function getCityByGeoposition(coords) {
  const reqUrl = `${GEOPOSITION_URL}?q=${coords.latitude},${coords.longitude}&apikey=${WEATHER_API_KEY}`;
  return axios.get(reqUrl).then(res => res.data);
}

function getCurrentForecast(cityKey) {
  console.log("cityKey", cityKey);
  const reqUrl = `${CURRENT_FORECAST_URL}/${cityKey}?apikey=${WEATHER_API_KEY}`;
  return axios.get(reqUrl).then(res => res.data);
}

function getFiveDaysForecast(cityKey, isMatric = true) {
  const reqUrl = `${FIVE_DAYS_FORECAST_URL}/${cityKey}?apikey=${WEATHER_API_KEY}&metric=${isMatric}`;
  return axios.get(reqUrl).then(res => res.data);
}

function getFullForecast(cityKey, isMatric = true) {
  return axios
    .all([getCurrentForecast(cityKey), getFiveDaysForecast(cityKey, isMatric)])
    .then(
      axios.spread(function(current, fiveDays) {
        const forecastObj = { current, fiveDays };
        console.log("axios all: ", forecastObj);
        return forecastObj;
      })
    );
}

function getMultipleForecast(cities) {
  const citiesReqArr = cities.map(city => getCurrentForecast(city.key));
  return axios.all(citiesReqArr).then(res => {
    const forecastArr = res.map(item => item[0]);
    return forecastArr;
  });
}

function getWeatherImageMap() {
  return {
    '01': "sun",
    '02': "sun",
    '03': "sun",
    '04': "sun",
    '05': "sun",
    '06': "cloud",
    '07': "cloud",
    '08': "cloud",
    '09': "cloud",
    '10': "cloud",
    '11': "cloud",
    '12': "rain",
    '13': "rain",
    '14': "rain",
    '15': "rain",
    '16': "rain",
    '17': "rain",
    '18': "rain",
    '19': "cloud",
    '20': "cloud",
    '21': "cloud",
    '22': "snow",
    '23': "snow",
    '24': "snow",
    '25': "snow",
    '26': "snow",
    '29': "snow",
    '30': "clear",
    '31': "clear",
    '32': "clear",
    '33': "clear",
    '34': "clear",
    '35': "cloud",
    '36': "cloud",
    '37': "cloud",
    '38': "cloud",
    '39': "rain",
    '40': "rain",
    '41': "rain",
    '42': "rain",
    '43': "rain",
    '44': "snow"
  };
}

export default {
  getCitiesAutocomplete,
  getCurrentForecast,
  getFiveDaysForecast,
  getFullForecast,
  getMultipleForecast,
  getCityByGeoposition,
  getWeatherImageMap
};
