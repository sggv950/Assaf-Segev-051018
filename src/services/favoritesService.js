function getCitiesFromStorage() {
//   saveCitiesToStorage([
//     { name: "Tel Aviv", key: 1 },
//     { name: "Jerusalem", key: 2 },
//     { name: "Eilat", key: 3 },
//     { name: "bbbbb", key: 4 },
//     { name: "cccccc", key: 5 },
//     { name: "rtrtrt", key: 6 },
//     { name: "dfgeeg", key: 7 },
//   ]);
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
