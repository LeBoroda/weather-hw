import { getWeather } from './api-utility';

describe('API Tests', () => {
  let mockData;
  beforeEach(() => {
    mockData = [
      { name: 'TestCity', country: 'TST', lat: 49.8397, lon: 24.0297 },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getWeather should handle successful API calls', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ temp: 20 }),
      });
    const result = await getWeather('TestCity');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result.cityName).toBe('TestCity, TST');
    expect(result.temp).toBe(20);
  });
  it('getWeather should handle error of fetchCityByName', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });
    await expect(getWeather('UnknownCity')).rejects.toThrow('Did not get city');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('getWeather should handle error of fetchWeatherByCoordinates', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
      .mockResolvedValueOnce({
        ok: false,
      });
    await expect(getWeather('TestCity')).rejects.toThrow(
      'Error getting city by coordinates',
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it('getWeather should handle error of empty data of fetchCityByName', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(),
      })
      .mockResolvedValueOnce({
        ok: true,
      });
    await expect(getWeather('TestCity')).rejects.toThrow(
      'City coordinates are not available',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('getWeather should handle error of empty data of fetchWeatherByCoordinates', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(),
      });
    await expect(getWeather('UnknownCity')).rejects.toThrow(
      'No city data found',
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
