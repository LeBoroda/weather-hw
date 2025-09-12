import {
  capitaliseFirstLetter,
  clearSearchHistory,
  getCurrentDateAsText,
  getCurrentTimeAsText,
  getSearchHistory,
  mapCityCoordinatesData,
  mapCityWeatherData,
  saveSearchHistory,
} from './utils';

describe('Utilities tests', () => {
  describe('Is it a function', () => {
    it('Is getCurrentDate() a function', () => {
      expect(getCurrentDateAsText).toBeInstanceOf(Function);
    });
    it('Is getCurrentTime() a function', () => {
      expect(getCurrentTimeAsText).toBeInstanceOf(Function);
    });
    it('Is capitaliseFirstLetter() a function', () => {
      expect(capitaliseFirstLetter).toBeInstanceOf(Function);
    });
    it('Is mapCityCoordinates() a function', () => {
      expect(mapCityCoordinatesData).toBeInstanceOf(Function);
    });
    it('Is mapCityWeatherData() a function', () => {
      expect(mapCityWeatherData).toBeInstanceOf(Function);
    });
    it('Is saveSearchHistory a function', () => {
      expect(saveSearchHistory).toBeInstanceOf(Function);
    });
    it('Is clearSearchHistory a function', () => {
      expect(clearSearchHistory).toBeInstanceOf(Function);
    });
    it('Is getSearchHistory() a function', () => {
      expect(getSearchHistory).toBeInstanceOf(Function);
    });
  });
  describe('Text transformations tests', () => {
    it('Get date as text returns Day, Month Date, Year', () => {
      const date = new Date('2025-09-01T00:00:00.000Z');
      expect(getCurrentDateAsText(date)).toBe('Monday, September 1, 2025');
    });
    it('Get current time as text', () => {
      const date = new Date('2025-09-01T19:52:00.000Z');
      expect(getCurrentTimeAsText(date, true)).toBe('19:52');
    });
    it('Get current time as text with leading 0', () => {
      const date = new Date('2025-09-01T05:02:00.000Z');
      expect(getCurrentTimeAsText(date, true)).toBe('05:02');
    });
    it('Capitalise phrase mamma mia', () => {
      const str = 'mamma mia';
      expect(capitaliseFirstLetter(str)).toBe('Mamma Mia');
    });
  });
  describe('JSON Mapping tests', () => {
    it('mapCityCoordinatesData returns city coordinates object', () => {
      const sampleJson = {
        name: 'Babruysk',
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
      };
      expect(mapCityCoordinatesData(sampleJson)).toEqual({
        name: 'Babruysk',
        lat: 53.1449683,
        lon: 29.2281209,
      });
    });
    it('mapCityWeatherData() should return correct object', () => {
      const sampleJson = {
        coord: { lon: 29.2281, lat: 53.145 },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n',
          },
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
      expect(mapCityWeatherData(sampleJson)).toEqual({
        name: 'Babruysk',
        icon: '04n',
        temp: 15.78,
        weatherDescription: 'broken clouds',
        wind: 2.99,
        humidity: 73,
        pressure: 1023,
      });
    });
  });
  describe('LocalStorage functions test', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it('saveSearchHistory adds city', () => {
      saveSearchHistory('TestCity');
      const history = JSON.parse(localStorage.getItem('searchHistory'));
      expect(history).toContain('TestCity');
    });
    it('saveSearchHistory does not duplicate city', () => {
      saveSearchHistory('TestCity');
      saveSearchHistory('TestCity');
      const history = JSON.parse(localStorage.getItem('searchHistory'));
      expect(history).toEqual(['TestCity']);
    });
    it('saveSearchHistory limits to 5 entries', () => {
      for (let i = 1; i <= 6; i++) saveSearchHistory('TestCity' + i);
      const history = JSON.parse(localStorage.getItem('searchHistory'));
      expect(history).toHaveLength(5);
      expect(history).not.toContain('TestCity1');
    });
    it('clearSearchHistory() removes history', () => {
      for (let i = 1; i <= 5; i++) saveSearchHistory('TestCity' + i);
      clearSearchHistory();
      expect(localStorage.getItem('searchHistory')).toBeNull();
    });
    it('getSearchHistory returns empty array if no history present', () => {
      expect(getSearchHistory()).toEqual([]);
    });
    it('getSearchHistory returns history array when history is present', () => {
      saveSearchHistory('TestCity');
      expect(getSearchHistory()).toEqual(['TestCity']);
    });
  });
});
