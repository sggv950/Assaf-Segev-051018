<template>
  <section v-if="favoriteCities">
    <div class="headline-text">
      <h4>Favorites</h4>
      <p>get quick access to forecasts in different cities</p>
    </div>
    <div class="favorites-container">
      <b-card-group
        deck
        v-for="group in favoritesCitiesGroups"
        :key="group"
        class="favoritescities-groups"
      >
        <b-card
          v-for="city in favoriteCities.slice((group-1)*4, group*4)"
          :key="city.key"
          bg-variant="light"
          header-tag="p"
          :header="city.name"
          class="text-center favorite-city-card"
          @click="goToFullForecast(city)"
        >
          <b-card-text>
            <img
              :src="(city.forecast.WeatherIcon < 10 ? 
              'https://developer.accuweather.com/sites/default/files/0' : 
              'https://developer.accuweather.com/sites/default/files/') + 
              city.forecast.WeatherIcon +'-s.png'"
              alt="weather icon"
            />
            {{city.forecast.Temperature[tempUnit].Value | roundValue}}&deg;{{city.forecast.Temperature[tempUnit].Unit}}
          </b-card-text>
          <b-card-text>
            <b-button
              @click.stop="removeCityFromFavorites(city)"
              variant="danger"
            >Remove from Favorites</b-button>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </section>
</template>

<script>
export default {
  name: "favorites",
  computed: {
    favoriteCities() {
      return this.$store.state.favorites;
    },
    favoritesCitiesGroups() {
      return Math.ceil(this.favoriteCities.length / 4);
    },
    tempUnit() {
      return this.$store.state.tempUnit;
    }
  },
  filters: {
    roundValue(value) {
      return Math.round(value);
    }
  },
  methods: {
    goToFullForecast(city) {
      this.$router.push({
        name: "weather",
        params: { key: city.key, name: city.name }
      });
    },
    removeCityFromFavorites(city) {
      this.$store.dispatch({ type: "handleRemoveCityFromFavorite", city });
    }
  },
  created() {
    this.$store.dispatch({ type: "handleGetFavoriteCities" });
  }
};
</script>

<style lang="scss" scoped>
.headline-text {
  margin: 20px auto;
}

.favorites-container {
  @media (min-width: 640px) {
    padding: 20px;
  }
}
.favoritescities-groups {
  margin: 10px auto;
}
.favorite-city-card {
  cursor: pointer;
  max-width: 275px;
  margin: 10px auto;
  @media (min-width: 640px) {
    margin: 20px;
  }
}
</style>