export function getWeather(name) {
  return new Promise((resolve, reject) => {
    if (name === 'error') {
      reject(new Error('Error getting city by name'));
    } else {
      resolve({
        base: 'stations',
        cityName: name + ', TST',
        cod: 200,
        coord: { lon: -0.3763, lat: 39.4697 },
        main: { temp: 17.64, pressure: 1018 },
        name: name,
        weather: [{ description: 'thunderstorm with rain', icon: '11n' }],
        wind: { speed: 3.58 },
      });
    }
  });
}
