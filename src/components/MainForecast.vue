<template>
  <div
    class="forecast-container"
    :style="{'background-image': 'url('+require('../assets/images/'+imageUrl+'.jpg')+')'}"
  >
    <div class="current-forecast-container">
      <div class="text-details">
        <h3>{{cityMainForecast.name}}</h3>
        <div class="weather-conditions">
          <h5>{{cityMainForecast.mainForecast.current.WeatherText}}</h5>
          <img
            :src="'https://developer.accuweather.com/sites/default/files/' + 
            weatherIcon +
            '-s.png'"
            alt="weather icon"
          />
        </div>
        <h4>{{cityMainForecast.mainForecast.current.Temperature[tempUnit].Value | roundValue}}&deg;{{cityMainForecast.mainForecast.current.Temperature[tempUnit].Unit}}</h4>
      </div>
      <div class="favorite-btn">
        <b-button
          v-if="cityMainForecast.isFavorite"
          @click="addRemoveCity('remove')"
          variant="danger"
        >Remove from Favorites</b-button>
        <b-button v-else @click="addRemoveCity('add')" variant="success">Add to Favorites</b-button>
      </div>
    </div>
    <div class="five-days-forecast-container">
      <p class="text-details">forecast for the next five days:</p>
      <b-card-group deck>
        <b-card
          v-for="forecast in cityMainForecast.mainForecast.fiveDays.DailyForecasts"
          :key="forecast.Date"
          bg-variant="light"
          :header="forecast.Date | formatDate"
          class="text-center"
        >
          <b-card-text>
            {{forecast.Temperature.Maximum.Value | roundValue}}&deg;{{forecast.Temperature.Maximum.Unit}}
            /
            {{forecast.Temperature.Minimum.Value | roundValue}}&deg;{{forecast.Temperature.Minimum.Unit}}
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "mainForecast",
  props: ["cityMainForecast"],
  methods: {
    addRemoveCity(action) {
      this.$emit("addRemoveCity", action);
    }
  },
  filters: {
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("dddd DD-MMM");
      }
    },
    roundValue(value) {
      return Math.round(value);
    }
  },
  computed: {
    tempUnit() {
      return this.$store.state.tempUnit;
    },
    weatherIcon() {
      if (this.cityMainForecast.mainForecast.current.WeatherIcon < 10) {
        return "0" + this.cityMainForecast.mainForecast.current.WeatherIcon;
      } else {
        return this.cityMainForecast.mainForecast.current.WeatherIcon;
      }
    },
    weatherImageMap() {
      console.log(this.$store.state.weatherImageMap[this.weatherIcon]);
      return this.$store.state.weatherImageMap;
    },
    imageUrl() {
      const num = Math.floor(Math.random() * 3) + 1;
      return this.weatherImageMap[this.weatherIcon] + "-" + num;
    }
  }
};
</script>

<style lang="scss" scoped>
.forecast-container {
  background-size: cover;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  max-width: 90vw;
}

.current-forecast-container {
  width: 100%;
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin: 5px;
  padding: 10px;
  .text-details {
    color: white;
  }
}

.weather-conditions {
  display: flex;
  align-items: center;
  img {
    height: 37px;
  }
}

.five-days-forecast-container {
  text-align: start;
  margin: 5px;
  width: 100%;
  .text-details {
    color: white;
  }
}
</style>