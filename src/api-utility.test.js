import { getWeather } from './api-utility';

describe('API Tests', () => {
  describe('Is function test', () => {
    it('getWeather() should be function', () => {
      expect(getWeather).toBeInstanceOf(Function);
    });
  });
  describe('Functional tests', () => {
    it('resolves with weather data', () => {
      return expect(getWeather('Moscow')).resolves.toEqual({
        base: 'stations',
        cityName: 'Moscow, TST',
        cod: 200,
        coord: { lon: -0.3763, lat: 39.4697 },
        main: { temp: 17.64, pressure: 1018 },
        name: 'Moscow',
        weather: [{ description: 'thunderstorm with rain', icon: '11n' }],
        wind: { speed: 3.58 },
      });
    });

    it('rejects with error when name is "error"', () => {
      return expect(getWeather('error')).rejects.toThrow(
        'Error getting city by name',
      );
    });
  });
});
