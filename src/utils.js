export function getCurrentDateAsText(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getCurrentTimeAsText(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
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

export async function searchCityByNameAsync(cityName) {
  return [
    {
      name: cityName,
      local_names: {
        nl: 'Babroejsk',
        es: 'Babruisk',
        en: 'Babruysk',
        /* ... */ zh: '博布鲁伊斯克',
      },
      lat: 53.1449683,
      lon: 29.2281209,
      country: 'BY',
      state: 'Mahilyow Region',
    },
  ];
}

export function mapCityCoordinates(cityObject) {
  return {
    name: cityObject.name,
    lat: cityObject.lat,
    lon: cityObject.lon,
  };
}

export async function searchCityWeatherAsync(cityCoordinatesObject) {
  const { lat, lon, name } = cityCoordinatesObject;
  console.log(lat + lon);
  return {
    coord: { lon: 29.2281, lat: 53.145 },
    weather: [
      { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' },
    ],
    base: 'stations',
    main: {
      temp: 15.78,
      feels_like: 15.32,
      temp_min: 15.78,
      temp_max: 15.78,
      pressure: 1023,
      humidity: 73,
      sea_level: 1023,
      grnd_level: 1005,
    },
    visibility: 10000,
    wind: { speed: 2.99, deg: 94, gust: 4.85 },
    clouds: { all: 73 },
    dt: 1757361665,
    sys: { country: 'BY', sunrise: 1757301898, sunset: 1757349418 },
    timezone: 10800,
    id: 630468,
    name: name,
    cod: 200,
  };
}

export function mapCityWeatherData(cityWeatherObject) {
  return {
    name: cityWeatherObject.name,
    icon: cityWeatherObject.weather[0].icon,
    temp: cityWeatherObject.main.temp,
    weatherDescription: cityWeatherObject.weather[0].description,
    wind: cityWeatherObject.wind.speed,
    humidity: cityWeatherObject.main.humidity,
    pressure: cityWeatherObject.main.pressure,
  };
}

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

export async function getCityWeather(cityName) {
  const cityList = await searchCityByNameAsync(cityName);
  if (!cityList || cityList.length === 0) {
    throw new Error('City not found');
  }
  const cityCoordinatesJson = mapCityCoordinates(cityList[0]);
  const cityWeatherJson = await searchCityWeatherAsync(cityCoordinatesJson);
  return mapCityWeatherData(cityWeatherJson);
}
