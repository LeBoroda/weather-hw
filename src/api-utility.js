const apiKey = process.env.OPEN_WEATHER_KEY;

function fetchCityByName(name) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Did not get city by name');
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error('City coordinates are not available');
      }
      return data[0];
    });
}

function fetchWeatherByCoordinates(cityData) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error getting city by coordinates');
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error('No city data found');
      }
      return data;
    });
}

export function getWeather(name) {
  let cityName;
  return fetchCityByName(name)
    .then((cityData) => {
      cityName = `${cityData.name}, ${cityData.country}`;
      return fetchWeatherByCoordinates(cityData);
    })
    .then((data) => {
      data.cityName = cityName;
      return data;
    })
    .catch((error) => {
      console.error('Капитальне ащипька ', error);
      throw error;
    });
}
