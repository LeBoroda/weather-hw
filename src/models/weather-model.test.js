import { WeatherModel } from './weather-model';

describe('WeatherModel.getWeather', () => {
  let originalFetch;
  let model;
  let geocode;
  const origError = console.error;

  beforeEach(() => {
    originalFetch = global.fetch;
    model = new WeatherModel();
    console.error = jest.fn();
    geocode = [
      { name: 'TestCity', country: 'TST', lat: 49.8397, lon: 24.0297 },
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
    console.error = origError;
  });

  it('handles successful API calls (geocode + weather)', async () => {
    global.fetch = jest
      .fn()
      // geocode
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(geocode),
      })
      // weather by coordinates
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ temp: 20 }),
      });

    const result = await model.getWeather('TestCity');

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(result.cityName).toBe('TestCity, TST');
    expect(result.temp).toBe(20);
  });

  it('handles error of fetchCityByName (non-OK)', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });

    await expect(model.getWeather('UnknownCity')).rejects.toThrow(
      'Did not get city by name',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('handles error of fetchWeatherByCoordinates (non-OK)', async () => {
    global.fetch = jest
      .fn()
      // geocode ok
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(geocode),
      })
      // weather non-OK
      .mockResolvedValueOnce({ ok: false });

    await expect(model.getWeather('TestCity')).rejects.toThrow(
      'Error getting city by coordinates',
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('handles empty geocode data', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(undefined),
    });

    await expect(model.getWeather('TestCity')).rejects.toThrow(
      'City coordinates are not available',
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('handles empty weather data', async () => {
    global.fetch = jest
      .fn()
      // geocode ok
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(geocode),
      })
      // weather returns empty
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(undefined),
      });

    await expect(model.getWeather('TestCity')).rejects.toThrow(
      'No city data found',
    );
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
