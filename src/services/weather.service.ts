import axios from "axios";

export default class WeatherService {
  private readonly apiKey: string = "c9c7ea5b2159ff08281d0bb42ae0bf6f";
  private readonly baseUrl: string = "https://api.openweathermap.org/data/2.5/weather";

  currentWeather(lat: string, long: string) {
    lat = "37.313171";
    long = "-89.552422";

    return axios.get(
      `${this.baseUrl}?lat=${lat}&lon=${long}&appid=${this.apiKey}`
    );
  }
}