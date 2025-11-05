const apiKey = process.env.OPEN_WEATHER_KEY;

export class WeatherModel {
  constructor() {
    this.currentWeather = null;
  }

  async fetchCityByName(name) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Did not get city by name');
    }

    const data = await response.json();
    if (!data) {
      throw new Error('City coordinates are not available');
    }

    return data[0];
  }

  async fetchWeatherByCoordinates(cityData) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error getting city by coordinates');
    }

    const data = await response.json();
    if (!data) {
      throw new Error('No city data found');
    }

    return data;
  }

  async getWeather(name) {
    try {
      const cityData = await this.fetchCityByName(name);
      const cityName = `${cityData.name}, ${cityData.country}`;
      const weatherData = await this.fetchWeatherByCoordinates(cityData);

      weatherData.cityName = cityName;
      this.currentWeather = weatherData;

      return weatherData;
    } catch (error) {
      console.error('Very big error master boss! It says: ', error);
      throw error;
    }
  }
}
