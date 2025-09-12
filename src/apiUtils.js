//Async functions to get response from API

import { mapCityCoordinatesData, mapCityWeatherData } from './utils';

export async function asyncSearchCityByName() {
  /** Functions takes String with city name
     Function returns JSON Array of cities from API **/
  const resultArray = [''];
  if (!resultArray || resultArray.length === 0) {
    throw new Error('City not found');
  }
  return resultArray[0];
}

export async function asyncSearchCityWeather() {
  /** Function takes an cityCoordinatesObject object with city name, lat and lon
    Function returns JSON object with city weather data

    This will be required for real API call
    const { lat, lon, name } = cityCoordinatesObject; **/
}

export async function getCityWeather(cityName) {
  const cityList = await asyncSearchCityByName(cityName);
  const cityCoordinates = mapCityCoordinatesData(cityList);
  const cityWeatherJson = await asyncSearchCityWeather(cityCoordinates);
  return mapCityWeatherData(cityWeatherJson);
}
