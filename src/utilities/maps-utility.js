const googleApiKey = process.env.GOOGLE_MAPS_KEY;

export function getMapLink(weatherObject) {
  return `https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&key=${googleApiKey}&center=${weatherObject.cityName}`;
}
