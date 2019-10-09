function getCitiesFromStorage() {
  return JSON.parse(localStorage.getItem("favoriteCities"));
}

function saveCitiesToStorage(cities) {
  localStorage.setItem("favoriteCities", JSON.stringify(cities));
}

function addFavoriteCity(city) {
  const cities = getCitiesFromStorage() || [];
  cities.push(city);
  saveCitiesToStorage(cities);
}

function getFavoriteCityByKey(key) {
  const cities = getCitiesFromStorage();
  if (!cities) return false;
  return cities.find(city => city.key === key);
}

function removeFavoriteCity(key) {
  const cities = getCitiesFromStorage();
  const updatedCities = cities.filter(city => city.key !== key);
  saveCitiesToStorage(updatedCities);
}

export default {
  getCitiesFromStorage,
  getFavoriteCityByKey,
  addFavoriteCity,
  removeFavoriteCity
};
