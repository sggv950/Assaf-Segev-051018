import Vue from "vue";
import Vuex from "vuex";
import weatherService from "./services/weatherService";
import favoritesService from "./services/favoritesService";

Vue.use(Vuex);

export default new Vuex.Store({
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
    weatherImageMap: null,
    isError: false
  },

  mutations: {
    toggleError(state) {
      state.isError = !state.isError;
    },
    setTempUnit(state, { unit }) {
      state.tempUnit = unit;
    },
    clearCitiesSuggestions(state) {
      state.citiesSuggestions = [];
    },
    setCitiesSuggestions(state, { citiesSuggestions }) {
      state.citiesSuggestions = citiesSuggestions;
    },
    setMainForecast(state, { forecastObj }) {
      state.city.name = forecastObj.cityName;
      state.city.key = forecastObj.cityKey;
      state.city.isFavorite = forecastObj.isFavorite;
      state.city.mainForecast.current = forecastObj.fullForecast.current[0];
      state.city.mainForecast.fiveDays = forecastObj.fullForecast.fiveDays;
    },
    toggleSpinIcon(state, { isActive }) {
      state.isSpinIconActive = isActive;
    },
    GetWeatherImageMap(state, { weatherImgMap }) {
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
    handleToggleError({ commit }) {
      commit({ type: "toggleError" });
    },
    handleTempUnit({ state, commit, dispatch }, { unit }) {
      commit({ type: "setTempUnit", unit });
      const city = {
        Name: state.city.name,
        Key: state.city.key
      };
      dispatch({ type: "handleMainForecast", city });
    },
    handleSpinIcon({ commit }, { isActive }) {
      commit({ type: "toggleSpinIcon", isActive });
    },
    handleCitiesAutocomplete({ commit, dispatch }, { input }) {
      if (input.length < 3) {
        commit({ type: "clearCitiesSuggestions" });
        commit({ type: "toggleSpinIcon", isActive: false });
      } else {
        return weatherService
          .getCitiesAutocomplete(input)
          .then(citiesSuggestions => {
            commit({ type: "setCitiesSuggestions", citiesSuggestions });
            commit({ type: "toggleSpinIcon", isActive: false });
          })
          .catch(() => {
            dispatch({ type: "handleToggleError" });
          });
      }
    },
    handleGeopositionForecast({ dispatch }, { coords }) {
      return weatherService
        .getCityByGeoposition(coords)
        .then(position => {
          const city = {
            Name: `${position.AdministrativeArea.LocalizedName}, ${position.Country.LocalizedName}`,
            Key: position.Key
          };
          return dispatch({ type: "handleMainForecast", city });
        })
        .catch(() => {
          dispatch({ type: "handleToggleError" });
        });
    },
    handleMainForecast({ state, commit, dispatch }, { city }) {
      const isMatric = state.tempUnit === "Metric" ? true : false;
      return weatherService
        .getFullForecast(city.Key, isMatric)
        .then(fullForecast => {
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
          commit({ type: "clearCitiesSuggestions" });
          commit({ type: "setMainForecast", forecastObj });
        })
        .catch(() => {
          dispatch({ type: "handleToggleError" });
        });
    },
    handleGetWeatherImageMap({ commit }) {
      const weatherImgMap = weatherService.getWeatherImageMap();
      commit({ type: "GetWeatherImageMap", weatherImgMap });
    },

    handleGetFavoriteCities({ commit, dispatch }) {
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
          commit({ type: "updateFavoriteCities", updatedCities });
        })
        .catch(() => {
          dispatch({ type: "handleToggleError" });
        });
    },
    handleAddCityToFavorite({ commit }, { city }) {
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
