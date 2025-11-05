import { getMapLink } from './maps-utility';

describe('maps-utility', () => {
  it('getMapLink() includes provided cityName in the URL center', () => {
    const url = getMapLink({ cityName: 'TestCityName' });
    expect(url).toContain('TestCityName');
    expect(url).toContain('maps.googleapis.com/maps/api/staticmap');
  });
});
