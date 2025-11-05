import { LocationModel } from './location-model';

describe('LocationModel', () => {
  let originalFetch;
  let model;

  beforeEach(() => {
    originalFetch = global.fetch;
    model = new LocationModel();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it('fetchCurrentLocation(): successful call returns city name', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ city: 'TestCity' }),
    });
    await expect(model.fetchCurrentLocation()).resolves.toBe('TestCity');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('fetchCurrentLocation(): non-OK response throws', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });
    await expect(model.fetchCurrentLocation()).rejects.toThrow(
      'Location info not available',
    );
  });

  it('fetchCurrentLocation(): empty data throws', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(undefined),
    });
    await expect(model.fetchCurrentLocation()).rejects.toThrow(
      'Location info is empty',
    );
  });
});
