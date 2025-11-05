// Mocks for dependencies used inside the controller
const mockViewInstance = {
  initialize: jest.fn(),
  bindSearchInput: jest.fn(),
  bindClearInput: jest.fn(),
  bindSearchButton: jest.fn(),
  bindSearchForm: jest.fn(),
  bindClearHistory: jest.fn(),
  bindHistoryItemClick: jest.fn(),
  showLoading: jest.fn(),
  showError: jest.fn(),
  drawWeather: jest.fn(),
  drawHistory: jest.fn(),
  drawMap: jest.fn(),
  enableSearchButton: jest.fn(),
  clearSearchInput: jest.fn(),
  getSearchInputValue: jest.fn(),
  searchInput: { value: '' },
  clearVisibleHistory: jest.fn(),
};

const mockWeatherModelInstance = {
  getWeather: jest.fn(),
};
const mockHistoryModelInstance = {
  saveToHistory: jest.fn(),
  getHistory: jest.fn().mockReturnValue(['Toronto', 'Louisville']),
  clearHistory: jest.fn(),
};
const mockLocationModelInstance = {
  fetchCurrentLocation: jest.fn(),
};

jest.mock('../views/weather-view', () => ({
  WeatherView: jest.fn(() => mockViewInstance),
}));

jest.mock('../models/weather-model', () => ({
  WeatherModel: jest.fn(() => mockWeatherModelInstance),
}));

jest.mock('../models/history-model', () => ({
  HistoryModel: jest.fn(() => mockHistoryModelInstance),
}));

jest.mock('../models/location-model', () => ({
  LocationModel: jest.fn(() => mockLocationModelInstance),
}));

const mockGetMapLink = jest.fn(() => 'https://maps.example/static');
jest.mock('../utilities/maps-utility', () => ({
  getMapLink: (...args) => mockGetMapLink(...args),
}));

jest.mock('../utilities/text-utility', () => ({
  getTimeAsText: () => '12:34',
  getDateAsText: () => 'Monday, January 1, 2001',
}));

import { WeatherController } from './weather-controller';

describe('WeatherController', () => {
  const origError = console.error;
  beforeEach(() => {
    jest.clearAllMocks();
    mockViewInstance.searchInput.value = '';
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = origError;
  });

  it('initialize() sets up view and triggers loadInitialWeather', () => {
    const controller = new WeatherController();
    const spy = jest
      .spyOn(controller, 'loadInitialWeather')
      .mockResolvedValue();

    controller.initialize({ any: 'root-el' });

    expect(mockViewInstance.initialize).toHaveBeenCalledWith({
      any: 'root-el',
    });
    expect(mockViewInstance.bindSearchInput).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindClearInput).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindSearchButton).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindSearchForm).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindClearHistory).toHaveBeenCalledTimes(1);
    expect(mockViewInstance.bindHistoryItemClick).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalled();
  });

  it('loadInitialWeather() success displays weather and map', async () => {
    mockLocationModelInstance.fetchCurrentLocation.mockResolvedValueOnce(
      'Toronto',
    );
    mockWeatherModelInstance.getWeather.mockResolvedValueOnce({
      cityName: 'Toronto, CA',
      main: { temp: 1 },
      weather: [{ icon: '10d', description: 'Rain' }],
      wind: { speed: 3 },
    });

    const controller = new WeatherController();
    await controller.loadInitialWeather();

    expect(mockViewInstance.showLoading).toHaveBeenCalled();
    expect(mockWeatherModelInstance.getWeather).toHaveBeenCalledWith('Toronto');
    expect(mockViewInstance.drawWeather).toHaveBeenCalledWith(
      expect.objectContaining({
        cityName: 'Toronto, CA',
        searchTime: '12:34',
        searchDate: 'Monday, January 1, 2001',
      }),
    );
    expect(mockViewInstance.drawHistory).toHaveBeenCalledWith([
      'Toronto',
      'Louisville',
    ]);
    expect(mockViewInstance.drawMap).toHaveBeenCalledWith(
      'https://maps.example/static',
    );
  });

  it('loadInitialWeather() handles error and shows message', async () => {
    mockLocationModelInstance.fetchCurrentLocation.mockRejectedValueOnce(
      new Error('Geo fail'),
    );

    const controller = new WeatherController();
    await controller.loadInitialWeather();

    expect(mockViewInstance.showLoading).toHaveBeenCalled();
    expect(mockViewInstance.showError).toHaveBeenCalledWith(
      'Failed to load weather for your location',
    );
  });

  it('handleSearch() does nothing when input is empty', async () => {
    mockViewInstance.getSearchInputValue.mockReturnValueOnce('');
    const controller = new WeatherController();
    await controller.handleSearch();

    expect(mockViewInstance.showLoading).not.toHaveBeenCalled();
    expect(mockWeatherModelInstance.getWeather).not.toHaveBeenCalled();
  });

  it('handleSearch() success: shows loading, gets weather, saves history, displays, and clears input', async () => {
    mockViewInstance.getSearchInputValue.mockReturnValueOnce('Louisville');
    mockWeatherModelInstance.getWeather.mockResolvedValueOnce({
      cityName: 'Louisville, US',
      main: { temp: 5 },
      weather: [{ icon: '01d', description: 'Clear' }],
      wind: { speed: 1 },
    });

    const controller = new WeatherController();
    await controller.handleSearch();

    expect(mockViewInstance.showLoading).toHaveBeenCalled();
    expect(mockWeatherModelInstance.getWeather).toHaveBeenCalledWith(
      'Louisville',
    );
    expect(mockHistoryModelInstance.saveToHistory).toHaveBeenCalledWith(
      'Louisville',
    );
    expect(mockViewInstance.drawWeather).toHaveBeenCalled();
    expect(mockViewInstance.drawHistory).toHaveBeenCalled();
    expect(mockViewInstance.drawMap).toHaveBeenCalled();
    expect(mockViewInstance.clearSearchInput).toHaveBeenCalled();
  });

  it('handleSearch() error: shows user-friendly message', async () => {
    mockViewInstance.getSearchInputValue.mockReturnValueOnce('Unknown');
    mockWeatherModelInstance.getWeather.mockRejectedValueOnce(
      new Error('not found'),
    );

    const controller = new WeatherController();
    await controller.handleSearch();

    expect(mockViewInstance.showLoading).toHaveBeenCalled();
    expect(mockViewInstance.showError).toHaveBeenCalledWith(
      'Failed to get weather for "Unknown"',
    );
  });

  it('handleClearHistory() clears model and view', () => {
    const controller = new WeatherController();
    controller.handleClearHistory();

    expect(mockHistoryModelInstance.clearHistory).toHaveBeenCalled();
    expect(mockViewInstance.clearVisibleHistory).toHaveBeenCalled();
  });

  it('handleHistoryItemClick() sets input, enables button, and triggers search', async () => {
    const controller = new WeatherController();
    const handleSearchSpy = jest
      .spyOn(controller, 'handleSearch')
      .mockResolvedValue();

    controller.handleHistoryItemClick('Berlin');

    expect(mockViewInstance.searchInput.value).toBe('Berlin');
    expect(mockViewInstance.enableSearchButton).toHaveBeenCalledWith(true);
    expect(handleSearchSpy).toHaveBeenCalled();
  });
});
