export class LocationModel {
  async fetchCurrentLocation() {
    const url = 'https://get.geojs.io/v1/ip/geo.json';

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Location info not available');
    }

    const data = await response.json();
    if (!data) {
      throw new Error('Location info is empty');
    }

    return data.city;
  }
}
