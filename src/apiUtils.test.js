import { asyncSearchCityByName, asyncSearchCityWeather } from './apiUtils';

jest.mock('./apiUtils');

describe('API Utils tests', () => {
  describe('Is it a function', () => {
    it('Is searchCityByNameAsync() a function', () => {
      expect(asyncSearchCityByName).toBeInstanceOf(Function);
    });
    it('Is searchCityWeatherAsync() a function', () => {
      expect(asyncSearchCityWeather).toBeInstanceOf(Function);
    });
  });
  describe('Mocked async func tests', () => {
    it('asyncSearchCityByName returns result', async () => {
      await expect(asyncSearchCityByName('TestCity')).resolves.toEqual({
        country: 'BY',
        lat: 53.1449683,
        local_names: {
          en: 'Babruysk',
          es: 'Babruisk',
          nl: 'Babroejsk',
          zh: '博布鲁伊斯克',
        },
        lon: 29.2281209,
        name: 'TestCity',
        state: 'Mahilyow Region',
      });
    });
    it('Throws error if resultArray is empty', async () => {
      await expect(asyncSearchCityByName('No City')).rejects.toThrow(
        'City not found',
      );
    });
    it('asyncSearchCityWeather returns result', async () => {
      await expect(
        asyncSearchCityWeather({ name: 'TestCity', lat: 22, lon: 20 }),
      ).resolves.toEqual({
        base: 'stations',
        clouds: { all: 73 },
        cod: 200,
        coord: { lat: 53.145, lon: 29.2281 },
        dt: 1757361665,
        id: 630468,
        main: {
          feels_like: 15.32,
          grnd_level: 1005,
          humidity: 73,
          pressure: 1023,
          sea_level: 1023,
          temp: 15.78,
          temp_max: 15.78,
          temp_min: 15.78,
        },
        name: 'Babruysk',
        sys: { country: 'BY', sunrise: 1757301898, sunset: 1757349418 },
        timezone: 10800,
        visibility: 10000,
        weather: [
          {
            description: 'broken clouds',
            icon: '04n',
            id: 803,
            main: 'Clouds',
          },
        ],
        wind: { deg: 94, gust: 4.85, speed: 2.99 },
      });
    });
  });
});
