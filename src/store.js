import Vue from "vue";
import Vuex from "vuex";
import weatherModule from "./modules/weatherModule";
import favoritesModule from "./modules/favoritesModule";
import weatherService from "./services/weatherService";
import favoritesService from "./services/favoritesService";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    weatherModule,
    favoritesModule
  },
  state: {
    citiesSuggestions: [],
    city: {
      name: "",
      key: "",
      isFavorite: false,
      mainForecast: {
        current: null,
        fiveDays: []
      }
    },
    tempUnit: "Metric",
    favorites: [],
    isSpinIconActive: false,
    weatherImageMap: null
  },
  mutations: {
    setTempUnit(state , {unit}){
      state.tempUnit = unit;
    },
    clearCitiesSuggestions(state) {
      state.citiesSuggestions = [];
    },
    setCitiesSuggestions(state, { citiesSuggestions }) {
      console.log("from mutation citiesSuggestions: ", citiesSuggestions);
      state.citiesSuggestions = citiesSuggestions;
    },
    setMainForecast(state, { forecastObj }) {
      console.log("setMainForecast mut: ", forecastObj);
      state.city.name = forecastObj.cityName;
      state.city.key = forecastObj.cityKey;
      state.city.isFavorite = forecastObj.isFavorite;
      state.city.mainForecast.current = forecastObj.fullForecast.current[0];
      state.city.mainForecast.fiveDays = forecastObj.fullForecast.fiveDays;
    },
    toggleSpinIcon(state, { isActive }) {
      state.isSpinIconActive = isActive;
    },
    GetWeatherImageMap(state, {weatherImgMap}){
      state.weatherImageMap = weatherImgMap;
    },
    updateFavoriteCities(state, { updatedCities }) {
      state.favorites = updatedCities;
    },
    addFavoriteCity(state) {
      state.city.isFavorite = true;
    },
    removeFavoriteCity(state, { city }) {
      const updatedCities = state.favorites.filter(
        favorite => favorite.key !== city.key
      );
      state.favorites = updatedCities;
      if (state.city.name === city.name) state.city.isFavorite = false;
    }
  },
  actions: {
    handleTempUnit({state, commit, dispatch}, {unit}){
      console.log(unit)
      commit({type: 'setTempUnit', unit});
      const city = {
        Name: state.city.name,
        Key: state.city.key
      }
      dispatch({type:'handleMainForecast', city})
    },
    handleSpinIcon({ commit }, { isActive }) {
      commit({ type: "toggleSpinIcon", isActive });
    },
    handleCitiesAutocomplete({ commit }, { input }) {
      if (input.length < 3) {
        commit({ type: "clearCitiesSuggestions" });
        commit({ type: "toggleSpinIcon", isActive: false });
      } else {
        return weatherService
          .getCitiesAutocomplete(input)
          .then(citiesSuggestions => {
            console.log("from action citiesSuggestions: ", citiesSuggestions);
            commit({ type: "setCitiesSuggestions", citiesSuggestions });
            commit({ type: "toggleSpinIcon", isActive: false });
          });
      }
    },

    handleGeopositionForecast({dispatch}, {coords}){
      return weatherService.getCityByGeoposition(coords)
      .then(position => {
        const city = {
          Name: `${position.AdministrativeArea.LocalizedName}, ${position.Country.LocalizedName}`,
          Key: position.Key
        }
        return dispatch({type: 'handleMainForecast', city})
      })
    },

    handleMainForecast({ state, commit }, { city }) {
      console.log("city", city);
      const isMatric = state.tempUnit === 'Metric' ? true : false;
      return weatherService.getFullForecast(city.Key, isMatric).then(fullForecast => {
        console.log("handleMainForecast action: ", fullForecast);
        const cityName = city.LocalizedName
          ? `${city.LocalizedName}, ${city.Country.LocalizedName}`
          : city.Name;
        const cityKey = city.Key;
        const isFavorite = favoritesService.getFavoriteCityByKey(cityKey);
        const forecastObj = {
          cityName,
          cityKey,
          isFavorite: !!isFavorite,
          fullForecast
        };
        console.log("forecastObj", forecastObj);
        commit({ type: "clearCitiesSuggestions" });
        commit({ type: "setMainForecast", forecastObj });
      });
    },

    handleGetWeatherImageMap({commit}){
      const weatherImgMap = weatherService.getWeatherImageMap();
      console.log('weatherImgMap', weatherImgMap)
      commit({type: 'GetWeatherImageMap', weatherImgMap})
    },

    handleCurrentForecast() {
      return weatherService.getCurrentForecast().then(forecast => {
        console.log("from action current forecast", forecast);
      });
    },

    handleGetFavoriteCities({ commit }) {
      const cities = favoritesService.getCitiesFromStorage();
      return weatherService
        .getMultipleForecast(cities)
        .then(multipleForcasts => {
          const updatedCities = cities.map((city, cityIdx) => {
            return {
              ...city,
              forecast: multipleForcasts.find(
                (forecast, forecastIdx) => cityIdx === forecastIdx
              )
            };
          });
          console.log("updatedCities", updatedCities);
          commit({ type: "updateFavoriteCities", updatedCities });
        });
    },

    handleAddCityToFavorite({ commit }, { city }) {
      console.log("handleAddCityToFavorite", city);
      favoritesService.addFavoriteCity(city);
      commit({ type: "addFavoriteCity", city });
    },
    handleRemoveCityFromFavorite({ commit }, { city }) {
      favoritesService.removeFavoriteCity(city.key);
      commit({ type: "removeFavoriteCity", city });
    }
  },
  getters: {
    citiesSuggestions: state =>
      state.citiesSuggestions.filter((city, idx) => idx < 5),
    favoriteCities: state => state.favorites
  }
});
