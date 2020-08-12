<template>
  <div class="container">
    <Card v-if="weather.name">
      <h1>{{ weather.name }}</h1>
      <h2>{{ weather.currentTemp }} feels like {{ weather.feelsLike }}</h2>
      <div class="column-container">
        <div class="column">
          <div class="row">
            <span class="label">High / Low</span>
            <span class="value">{{ weather.low }} / {{ weather.high }}</span>
          </div>
          <div class="row">
            <span class="label">Humidity</span>
            <span class="value">{{ weather.humidity }}</span>
          </div>
          <div class="row">
            <span class="label">Sunrise</span>
            <span class="value">{{ weather.sunrise }}</span>
          </div>
        </div>
        <div class="column">
          <div class="row">
            <span class="label">Weather</span>
            <span class="value">{{
              weather.main + " (" + weather.description + ")"
            }}</span>
          </div>
          <div class="row">
            <span class="label">Wind (Speed and Heading)</span>
            <span class="value">{{ weather.wind }}</span>
          </div>
          <div class="row">
            <span class="label">Sunset</span>
            <span class="value">{{ weather.sunset }}</span>
          </div>
        </div>
      </div>
      <p class="subtitle">Last Updated: {{ weather.datetime }}</p>
    </Card>
    <Card v-else>
      No Weather Data Found By Location
    </Card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import WeatherService from "@/services/weather.service";
import Weather from "@/models/weather.model";

export default Vue.extend({
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      weather: new Weather(),
    };
  },
  mounted(): void {
    navigator.geolocation.getCurrentPosition((pos: Position) => {
      const coords: Coordinates = pos.coords;
      new WeatherService()
        .currentWeather(coords.latitude, coords.longitude)
        .then((response) => {
          const weatherData = response.data;
          this.weather = {
            name: weatherData.name,
            datetime: new Date(weatherData.dt * 1000).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              }
            ),
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            currentTemp: weatherData.main.temp.toFixed(0) + "°",
            feelsLike: weatherData.main.feels_like.toFixed(0) + "°",
            low: weatherData.main.temp_min.toFixed(0) + "°",
            high: weatherData.main.temp_max.toFixed(0) + "°",
            humidity: weatherData.main.humidity + "%",
            wind:
              weatherData.wind.speed.toFixed(0) +
              "mph  " +
              weatherData.wind.deg +
              "°",
            sunrise: new Date(
              weatherData.sys.sunrise * 1000
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            }),
            sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "2-digit",
              }
            ),
          };
        });
    });
  },
});
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  width: 800px;
}

.subtitle {
  margin: 0;
}

.column-container {
  display: flex;
  justify-content: space-between;

  .column {
    width: 49%;
  }
}

.row {
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 8px 0;

  &:last-child {
    border-bottom: none;
  }
}
</style>
