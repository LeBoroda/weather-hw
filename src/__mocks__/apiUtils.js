export async function asyncSearchCityByName(cityName) {
  const resultArray = [
    {
      name: cityName,
      local_names: {
        nl: 'Babroejsk',
        es: 'Babruisk',
        en: 'Babruysk',
        zh: '博布鲁伊斯克',
      },
      lat: 53.1449683,
      lon: 29.2281209,
      country: 'BY',
      state: 'Mahilyow Region',
    },
  ];
  if (cityName === 'No City') {
    throw new Error('City not found');
  }
  return resultArray[0];
}

export async function asyncSearchCityWeather(cityCoordinatesObject) {
  console.log(cityCoordinatesObject);
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
    name: 'Babruysk',
    cod: 200,
  };
}
