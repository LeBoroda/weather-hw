import { fetchLocation, getMapLink } from './maps-utility';

describe('Test Map and locationModel utilities', () => {
  let mockData;
  beforeEach(() => {
    mockData = {
      city: 'TestCity',
      country_code: 'TST',
      cityName: 'TestCityName',
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('Is a function', () => {
    it('getMapLink() should be function', () => {
      expect(getMapLink).toBeInstanceOf(Function);
    });
    it('fetchLocation() should be function', () => {
      expect(fetchLocation).toBeInstanceOf(Function);
    });
  });
  describe('Functional tests', () => {
    it('fetchLocation() should handle successful api calls', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });
      const name = await fetchLocation();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(name).toBe('TestCity');
    });
    it('fetchLocation() should handle unsuccessful api calls', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
      await expect(fetchLocation).rejects.toThrow(
        'Location info not available',
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    it('fetchLocation() should handle empty data api calls', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(),
      });
      await expect(fetchLocation).rejects.toThrow('Location info is empty');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    it('Google API should return correct URL', () => {
      const url = getMapLink(mockData);
      expect(url).toContain('TestCityName');
    });
  });
});
