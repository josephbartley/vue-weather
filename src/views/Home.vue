<template>
  <Card v-if="weather.name">
    <h1>{{ weather.name }}</h1>
    <h2>{{ weather.currentTemp }} feels like {{ weather.feelsLike }}</h2>
    <div>{{ weather.main }} ({{ weather.description }})</div>
    <p class="subtitle">
      {{ weather.datetime }}
    </p>
  </Card>
  <Card v-else>
    No Weather Data Found By Location
  </Card>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import WeatherService from "@/services/weather.service";
import Weather from "@/models/weather.model";
import { kelvinToFahrenheit } from "@/helpers/conversions";

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
            datetime: new Date(
              new Date(0).setUTCMilliseconds(weatherData.dt)
            ).toLocaleTimeString(),
            description: weatherData.weather[0].description,
            currentTemp:
              kelvinToFahrenheit(weatherData.main.temp).toFixed(0) + "°",
            feelsLike:
              kelvinToFahrenheit(weatherData.main.feels_like).toFixed(0) + "°",
          };
        });
    });
  },
});
</script>

<style lang="scss" scoped>
.subtitle {
  margin: 0;
}
</style>
