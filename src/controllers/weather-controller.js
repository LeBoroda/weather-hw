import { WeatherModel } from '../models/weather-model';
import { HistoryModel } from '../models/history-model';
import { LocationModel } from '../models/location-model';
import { WeatherView } from '../views/weather-view';
import { getMapLink } from '../utilities/maps-utility';
import { getDateAsText, getTimeAsText } from '../utilities/text-utility';

export class WeatherController {
  constructor() {
    this.weatherModel = new WeatherModel();
    this.historyModel = new HistoryModel();
    this.locationModel = new LocationModel();
    this.view = new WeatherView();
  }

  initialize(rootElement) {
    this.view.initialize(rootElement);
    this.bindEvents();
    this.loadInitialWeather();
  }

  bindEvents() {
    this.view.bindSearchInput(() => {
      const value = this.view.getSearchInputValue();
      this.view.enableSearchButton(value.length > 0);
    });

    this.view.bindClearInput(() => {
      this.view.clearSearchInput();
    });

    this.view.bindSearchButton(() => {
      this.handleSearch();
    });

    this.view.bindSearchForm(() => {
      this.handleSearch();
    });

    this.view.bindClearHistory(() => {
      this.handleClearHistory();
    });

    this.view.bindHistoryItemClick((cityName) => {
      this.handleHistoryItemClick(cityName);
    });
  }

  async loadInitialWeather() {
    try {
      this.view.showLoading();
      const city = await this.locationModel.fetchCurrentLocation();
      const weather = await this.weatherModel.getWeather(city);
      this.displayWeather(weather);
    } catch (error) {
      console.error('Failed to get location weather', error);
      this.view.showError('Failed to load weather for your location');
    }
  }

  async handleSearch() {
    const cityName = this.view.getSearchInputValue();
    if (cityName) {
      try {
        this.view.showLoading();
        const weather = await this.weatherModel.getWeather(cityName);
        this.historyModel.saveToHistory(cityName);
        this.displayWeather(weather);
        this.view.clearSearchInput();
      } catch (error) {
        console.error('Failed to search weather', error);
        this.view.showError(`Failed to get weather for "${cityName}"`);
      }
    }
  }

  displayWeather(weather) {
    weather.searchTime = getTimeAsText(new Date());
    weather.searchDate = getDateAsText(new Date());
    this.view.drawWeather(weather);
    this.view.drawHistory(this.historyModel.getHistory());
    this.view.drawMap(getMapLink(weather));
  }

  handleClearHistory() {
    this.historyModel.clearHistory();
    this.view.clearVisibleHistory();
  }

  handleHistoryItemClick(cityName) {
    this.view.searchInput.value = cityName;
    this.view.enableSearchButton(true);
    this.handleSearch();
  }
}
