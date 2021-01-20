<template>
  <div class="home">
    <h4>Welcome to my weather App</h4>
    <p>search for current and future forecast in different cities. you can also save cities to the favories for quick access later...</p>
    <search-component></search-component>
    <main-forecast
      v-if="cityMainForecast.name.length > 0"
      class="main-forecast"
      :cityMainForecast="cityMainForecast"
      @addRemoveCity="handleCityInFavorite"
    ></main-forecast>
    <div class="loader" v-else >
      <b-spinner class="loader-spinner" type="grow" variant="info" label="Spinning"></b-spinner>
      <b-spinner class="loader-spinner" type="grow" variant="info" label="Spinning"></b-spinner>
      <b-spinner class="loader-spinner" type="grow" variant="info" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import SearchComponent from "@/components/SearchComponent";
import MainForecast from "@/components/MainForecast";

export default {
  name: "weather",
  components: {
    SearchComponent,
    MainForecast
  },
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: ''
    };
  },
  methods: {
    handleCityInFavorite(action) {
      if (action === "add") {
        this.$store.dispatch({
          type: "handleAddCityToFavorite",
          city: {
            name: this.cityMainForecast.name,
            key: this.cityMainForecast.key
          }
        });
      } else {
        this.$store.dispatch({
          type: "handleRemoveCityFromFavorite",
          city: {
            name: this.cityMainForecast.name,
            key: this.cityMainForecast.key
          }
        });
      }
    },
    //FIX geolocation logic
    getGeoLocation() {
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
        console.log(this.errorStr);
        this.gettingLocation = false;
        return this.handleDefualtLocationForecast();
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.location = pos;
          this.gettingLocation = true;
          return this.handleGeoPositionForecast(pos.coords);
        },
        err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
          return this.handleDefualtLocationForecast();
        }
      );
    },
    handleDefualtLocationForecast() {
      const city = {
        Name: "Tel Aviv, Israel",
        Key: "215854"
      };
      this.$store.dispatch({
        type: "handleMainForecast",
        city
      });
    },
    handleGeoPositionForecast(coords) {
      this.gettingLocation = false;
      return this.$store.dispatch({
        type: "handleGeopositionForecast",
        coords
      });
    }
  },
  computed: {
    cityMainForecast() {
      return this.$store.state.city;
    }
  },
  created() {
    this.$store.dispatch({ type: "handleGetWeatherImageMap" });
    const city = this.$route.params;
    if (city.key && city.name) {
      this.$store.dispatch({
        type: "handleMainForecast",
        city: { Key: city.key, Name: city.name }
      });
    } else {
      this.handleDefualtLocationForecast();
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 30px;
}

.main-forecast {
  margin: 30px auto;
}

.loader {
  margin-top: 50px;
}

.loader-spinner{
  margin: 10px;
}
</style>