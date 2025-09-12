//Functions to convert data into text or modify text

export function getCurrentDateAsText(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getCurrentTimeAsText(date, useUTC = false) {
  let hours = useUTC ? date.getUTCHours() : date.getHours();
  let minutes = useUTC ? date.getUTCMinutes() : date.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes}`;
}

export function capitaliseFirstLetter(stringToModify) {
  return stringToModify
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

//Functions to map JSON objects

export function mapCityCoordinatesData(cityJson) {
  return {
    name: cityJson.name,
    lat: cityJson.lat,
    lon: cityJson.lon,
  };
}

export function mapCityWeatherData(cityWeatherJson) {
  return {
    name: cityWeatherJson.name,
    icon: cityWeatherJson.weather[0].icon,
    temp: cityWeatherJson.main.temp,
    weatherDescription: cityWeatherJson.weather[0].description,
    wind: cityWeatherJson.wind.speed,
    humidity: cityWeatherJson.main.humidity,
    pressure: cityWeatherJson.main.pressure,
  };
}

//Functions to work with browser localStorage

export function saveSearchHistory(cityName) {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!history.includes(cityName)) {
    history.unshift(cityName);
    if (history.length > 5) {
      history.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }
}

export function clearSearchHistory() {
  localStorage.removeItem('searchHistory');
}

export function getSearchHistory() {
  return JSON.parse(localStorage.getItem('searchHistory')) || [];
}
