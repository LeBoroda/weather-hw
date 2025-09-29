const googleApiKey = process.env.GOOGLE_MAPS_KEY;

export function getMapLink(weatherObject) {
  return `https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&key=${googleApiKey}&center=${weatherObject.cityName}`;
}

export function fetchLocation() {
  const url = 'https://get.geojs.io/v1/ip/geo.json';
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Location info not available');
      }
      return response.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error('Location info is empty');
      }
      return `${data.city}`;
    });
}
