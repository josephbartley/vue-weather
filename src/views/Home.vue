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
import Card from "@/components/Card.vue";
import WeatherService from "@/services/weather.service";
import { kelvinToFahrenheit } from "@/helpers/conversions";

const weatherService = new WeatherService();

export default {
  name: "Home",
  components: {
    Card
  },
  data() {
    return {
      weather: {}
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((pos: any) => {
      const coords = pos.coords;
      weatherService
        .currentWeather(coords.latitude, coords.longitude)
        .then(response => {
          const weatherData = response.data;
          this.weather = {
            name: weatherData.name,
            datetime: new Date(
              new Date(0).setUTCMilliseconds(weatherData.dt)
            ).toLocaleTimeString(),
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            currentTemp:
              kelvinToFahrenheit(weatherData.main.temp).toFixed(0) + "°",
            feelsLike:
              kelvinToFahrenheit(weatherData.main.feels_like).toFixed(0) + "°"
          };
        });
    });
  }
};
</script>

<style lang="scss" scoped>
.subtitle {
  margin: 0;
}
</style>
