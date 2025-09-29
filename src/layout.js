export function drawLayout(wrapperElement) {
  drawHeader(wrapperElement);
  drawMain(wrapperElement);
  drawFooter(wrapperElement);
}

export function drawHeader(wrapperElement) {
  const header = createHeader();
  wrapperElement.appendChild(header);
}

export function drawMain(wrapperElement) {
  const main = createMain();
  wrapperElement.appendChild(main);
}

export function drawFooter(wrapperElement) {
  const footer = createFooter();
  wrapperElement.appendChild(footer);
}

export function drawWeather(cityWeatherDataObject) {
  const weatherData = document.querySelector('#weatherData');
  const emptyWeatherContainer = document.querySelector(
    '.weather-section .state-container',
  );
  weatherData.innerHTML = '';

  const weatherHeaderContainer = createWeatherHeaderContainer(
    cityWeatherDataObject,
  );
  const weatherContent = createWeatherContent(cityWeatherDataObject);

  weatherData.append(weatherHeaderContainer, weatherContent);

  emptyWeatherContainer.classList.add('hidden');
  weatherData.classList.remove('hidden');
}

export function drawHistory(searchHistoryNames) {
  const historyList = document.querySelector('.history-list');
  const emptyHistory = historyList.querySelector('.state-container');
  const clearHistoryButton = document.querySelector('.history-actions button');

  historyList.querySelectorAll('.history-item').forEach((item) => {
    item.remove();
  });

  for (const cityName of searchHistoryNames) {
    const historyItem = createHistoryItem(cityName);
    historyList.prepend(historyItem);

    const historyItems = historyList.querySelectorAll('.history-item');
    if (historyItems.length > 10) {
      const lastHistoryItem = historyItems[historyItems.length - 1];
      if (lastHistoryItem) historyList.removeChild(lastHistoryItem);
    }
  }
  emptyHistory.classList.add('hidden');
  clearHistoryButton.disabled = false;
}

export function drawMap(weatherLink) {
  const mapContainer = document.querySelector('.map-section .map-container');
  const emptyMap = mapContainer.querySelector('.state-container');
  emptyMap.classList.add('hidden');
  const mapData = document.createElement('div');
  mapData.id = 'map';
  if (mapContainer.querySelector('#map')) {
    mapContainer.removeChild(mapContainer.querySelector('#map'));
  }
  const mapImg = document.createElement('img');
  mapImg.src = weatherLink;
  mapImg.alt = 'City map img';
  mapData.appendChild(mapImg);
  mapContainer.appendChild(mapData);
}

export function getVisibleHistoryItems() {
  const historyList = document.querySelector('.history-list');
  return Array.from(historyList.querySelectorAll('.history-item')).map(
    (element) => element.querySelector('h3').innerText,
  );
}

export function clearVisibleHistory() {
  const historyList = document.querySelector('.history-list');
  const clearHistoryButton = document.querySelector('.history-actions button');
  const emptyHistory = historyList.querySelector('.state-container');
  historyList.querySelectorAll('.history-item').forEach((item) => {
    item.remove();
  });
  emptyHistory.classList.remove('hidden');
  clearHistoryButton.disabled = true;
}

export function enableSearchButton(searchInput, searchButton) {
  searchButton.disabled = searchInput.value.trim() === '';
}

export function clearSearchInput(searchInput, searchButton) {
  searchInput.value = '';
  searchButton.disabled = true;
  searchInput.blur();
}

function createHeader() {
  const header = document.createElement('header');
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container', 'header-container');
  const headerTitle = document.createElement('h1');
  const headerIcon = document.createElement('i');
  headerIcon.classList.add('fas', 'fa-cloud-sun');
  const textWrapper = document.createElement('span');
  textWrapper.innerText = 'Weather Forecast';
  headerTitle.append(headerIcon, textWrapper);
  headerContainer.appendChild(headerTitle);
  header.appendChild(headerContainer);

  return header;
}

function createMain() {
  const main = document.createElement('main');
  main.classList.add('container');
  const searchSection = createSearchSection();
  const mainInfoSection = createMainInfoSection();
  main.append(searchSection, mainInfoSection);
  return main;
}

function createSearchSection() {
  const searchSection = document.createElement('section');
  searchSection.classList.add('search-section');
  const searchCard = document.createElement('div');
  searchCard.classList.add('card');
  searchSection.appendChild(searchCard);
  const searchCardHeader = document.createElement('h2');
  searchCardHeader.innerText = 'Search for a city';
  const searchForm = createSearchForm();
  searchCard.append(searchCardHeader, searchForm);

  return searchSection;
}

function createSearchForm() {
  const searchForm = document.createElement('form');
  searchForm.id = 'cityForm';

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');
  const searchInput = createSearchInput();
  const clearInputButton = createClearInputButton();
  inputWrapper.append(searchInput, clearInputButton);

  const searchButton = createSearchButton();

  searchForm.append(inputWrapper, searchButton);
  return searchForm;
}

function createSearchInput() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'cityInput';
  searchInput.placeholder = 'Enter city name';
  searchInput.setAttribute('aria-label', 'City name');

  return searchInput;
}

function createClearInputButton() {
  const clearInputButton = document.createElement('button');
  clearInputButton.id = 'clearButton';
  clearInputButton.type = 'button';
  clearInputButton.classList.add('clear-button');
  clearInputButton.setAttribute('aria-label', 'Clear input');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-times-circle');
  clearInputButton.appendChild(icon);

  return clearInputButton;
}

function createSearchButton() {
  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  searchButton.type = 'submit';
  searchButton.classList.add('btn-primary');
  searchButton.disabled = true;
  searchButton.innerText = 'Search';

  return searchButton;
}

function createMainInfoSection() {
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('desktop-container');

  const mainContent = document.createElement('div');
  mainContent.classList.add('main-content');

  const weatherSection = createWeatherSection();
  const mapSection = createMapSection();
  mainContent.append(weatherSection, mapSection);

  const sidebar = createSidebar();
  desktopContainer.append(mainContent, sidebar);

  return desktopContainer;
}

function createWeatherSection() {
  const weatherSection = document.createElement('section');
  weatherSection.classList.add('weather-section');
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('card');

  const emptyStateContainer = createWeatherEmptyCard();
  const weatherDataContainer = createWeatherDataCard();

  weatherCard.append(emptyStateContainer, weatherDataContainer);
  weatherSection.appendChild(weatherCard);

  return weatherSection;
}

function createWeatherEmptyCard() {
  const emptyStateContainer = document.createElement('div');
  emptyStateContainer.classList.add('state-container');
  const emptyStateIconContainer = document.createElement('div');
  emptyStateIconContainer.classList.add('state-icon');
  const emptyStateIcon = document.createElement('i');
  emptyStateIcon.classList.add('fas', 'fa-cloud-sun');
  emptyStateIconContainer.appendChild(emptyStateIcon);
  const emptyStateHeader = document.createElement('h3');
  emptyStateHeader.innerText = 'No weather data to display';
  const emptyStatePrompt = document.createElement('p');
  emptyStatePrompt.innerText = 'Search for a city to see the current weather';
  emptyStateContainer.append(
    emptyStateIconContainer,
    emptyStateHeader,
    emptyStatePrompt,
  );

  return emptyStateContainer;
}

function createWeatherDataCard() {
  const weatherDataContainer = document.createElement('div');
  weatherDataContainer.id = 'weatherData';
  weatherDataContainer.classList.add('hidden');

  return weatherDataContainer;
}

function createMapSection() {
  const mapSection = document.createElement('section');
  mapSection.classList.add('map-section');
  const mapSectionCard = document.createElement('div');
  mapSectionCard.classList.add('card');
  const mapSectionHeader = createMapSectionHeader();

  const mapSectionMapContainer = document.createElement('div');
  mapSectionMapContainer.classList.add('map-container');
  const mapSectionEmptyMapStateContainer = createEmptyMapCard();
  mapSectionMapContainer.appendChild(mapSectionEmptyMapStateContainer);
  mapSectionCard.append(mapSectionHeader, mapSectionMapContainer);
  mapSection.appendChild(mapSectionCard);

  return mapSection;
}

function createMapSectionHeader() {
  const mapSectionHeader = document.createElement('div');
  mapSectionHeader.classList.add('section-header');
  const mapSectionHeaderContent = document.createElement('h2');
  const mapSectionHeaderContentIcon = document.createElement('i');
  mapSectionHeaderContentIcon.classList.add('fas', 'fa-map-marker-alt');
  const mapSectionHeaderContentText = document.createElement('span');
  mapSectionHeaderContentText.innerText = ' Location Map ';
  mapSectionHeaderContent.append(
    mapSectionHeaderContentIcon,
    mapSectionHeaderContentText,
  );
  mapSectionHeader.appendChild(mapSectionHeaderContent);

  return mapSectionHeader;
}

function createEmptyMapCard() {
  const mapSectionEmptyMapStateContainer = document.createElement('div');
  mapSectionEmptyMapStateContainer.classList.add('state-container');
  const emptyMapStateIcon = document.createElement('i');
  emptyMapStateIcon.classList.add('fas', 'fa-map');
  const emptyMapStatePrompt = document.createElement('p');
  emptyMapStatePrompt.innerText = 'Search for a city to display its map';
  mapSectionEmptyMapStateContainer.append(
    emptyMapStateIcon,
    emptyMapStatePrompt,
  );

  return mapSectionEmptyMapStateContainer;
}

function createSidebar() {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');
  const historySection = createHistorySection();
  sidebar.appendChild(historySection);

  return sidebar;
}

function createHistorySection() {
  const historySection = document.createElement('section');
  historySection.classList.add('history-section');
  const historyCard = createHistoryCard();
  historySection.appendChild(historyCard);

  return historySection;
}

function createHistoryCard() {
  const historyCard = document.createElement('div');
  historyCard.classList.add('card');
  const historySectionHeader = createHistorySectionHeader();

  const historySectionResultContainer = document.createElement('div');
  historySectionResultContainer.classList.add('history-container');
  const historyList = createHistoryList();

  const historyActions = document.createElement('div');
  historyActions.classList.add('history-actions');
  const clearHistoryButton = createClearHistoryButton();
  historyActions.appendChild(clearHistoryButton);

  historySectionResultContainer.append(historyList, historyActions);
  historyCard.append(historySectionHeader, historySectionResultContainer);

  return historyCard;
}

function createHistorySectionHeader() {
  const historySectionHeader = document.createElement('div');
  historySectionHeader.classList.add('section-header');
  const headerContainer = document.createElement('h2');
  const headerIcon = document.createElement('i');
  headerIcon.classList.add('fas', 'fa-history');
  const headerText = document.createElement('span');
  headerText.innerText = ' Search History ';
  headerContainer.append(headerIcon, headerText);
  historySectionHeader.appendChild(headerContainer);

  return historySectionHeader;
}

function createHistoryList() {
  const historyList = document.createElement('div');
  historyList.classList.add('history-list');

  const emptyHistory = createEmptyHistory();
  historyList.appendChild(emptyHistory);

  return historyList;
}

function createEmptyHistory() {
  const emptyHistoryStateContainer = document.createElement('div');
  emptyHistoryStateContainer.classList.add('state-container');
  const emptyHistoryStateIcon = document.createElement('i');
  emptyHistoryStateIcon.classList.add('fas', 'fa-search');
  const emptyHistoryStateInfoText = document.createElement('p');
  emptyHistoryStateInfoText.innerText = 'Your search history will appear here';
  emptyHistoryStateContainer.append(
    emptyHistoryStateIcon,
    emptyHistoryStateInfoText,
  );
  return emptyHistoryStateContainer;
}

function createClearHistoryButton() {
  const clearHistoryButton = document.createElement('button');
  clearHistoryButton.classList.add('btn-secondary');
  clearHistoryButton.disabled = true;
  const clearHistoryButtonIcon = document.createElement('i');
  clearHistoryButtonIcon.classList.add('fas', 'fa-trash-alt');
  const clearHistoryButtonText = document.createElement('span');
  clearHistoryButtonText.innerText = ' Clear History ';
  clearHistoryButton.append(clearHistoryButtonIcon, clearHistoryButtonText);
  return clearHistoryButton;
}

function createFooter() {
  const footer = document.createElement('footer');
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('container');
  const copyright = document.createElement('p');
  copyright.innerText = `Weather Forecast StanSky App \u00A9 ${new Date().getFullYear()}`;
  const sources = document.createElement('p');
  sources.innerText = 'Weather data provided by ';
  const sourcesLink = document.createElement('a');
  sourcesLink.href = 'https://openweathermap.org/';
  sourcesLink.target = '_blank';
  sourcesLink.innerText = 'OpenWeatherMap';
  sources.append(sourcesLink);
  footerContainer.append(copyright, sources);
  footer.appendChild(footerContainer);

  return footer;
}

function createWeatherHeaderContainer(cityWeatherDataObject) {
  const weatherHeaderContainer = document.createElement('div');
  weatherHeaderContainer.classList.add('weather-header');

  const weatherHeader = createWeatherHeader(cityWeatherDataObject);
  const lastUpdated = createLastUpdated(cityWeatherDataObject.searchTime);
  weatherHeaderContainer.append(weatherHeader, lastUpdated);

  return weatherHeaderContainer;
}

function createWeatherContent(cityWeatherDataObject) {
  const weatherContent = document.createElement('div');
  weatherContent.classList.add('weather-content');
  const currentWeather = document.createElement('div');
  currentWeather.classList.add('current-weather');

  const weatherPrimaryInfo = document.createElement('div');
  weatherPrimaryInfo.classList.add('weather-primary');
  const weatherIconContainer = createWeatherIconContainer(
    cityWeatherDataObject.weather[0].icon,
  );

  const weatherTempContainer = document.createElement('div');
  weatherTempContainer.classList.add('temperature-container');

  const weatherTemperature = createWeatherTemperature(
    cityWeatherDataObject.main.temp,
  );
  const weatherDescription = createWeatherDescription(
    cityWeatherDataObject.weather[0].description,
  );

  weatherTempContainer.append(weatherTemperature, weatherDescription);

  weatherPrimaryInfo.append(weatherIconContainer, weatherTempContainer);

  const weatherDetails = document.createElement('div');
  weatherDetails.classList.add('weather-details');

  const windDetails = createWindDetails(cityWeatherDataObject.wind.speed);

  const humidityDetails = createHumidityDetails(
    cityWeatherDataObject.main.humidity,
  );

  const pressureDetails = createPressureDetails(
    cityWeatherDataObject.main.pressure,
  );

  weatherDetails.append(windDetails, humidityDetails, pressureDetails);

  currentWeather.append(weatherPrimaryInfo, weatherDetails);
  weatherContent.appendChild(currentWeather);

  return weatherContent;
}

function createWeatherIconContainer(iconCode) {
  const weatherIconContainer = document.createElement('div');
  weatherIconContainer.classList.add('weather-icon');
  const weatherIconImg = document.createElement('img');
  weatherIconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconImg.alt = 'Broken Clouds';
  weatherIconContainer.appendChild(weatherIconImg);
  return weatherIconContainer;
}

function createWeatherTemperature(tempData) {
  const weatherTemperature = document.createElement('div');
  weatherTemperature.classList.add('temperature');
  weatherTemperature.innerText = `${tempData}°C`;
  return weatherTemperature;
}

function createWeatherDescription(descriptionData) {
  const weatherDescription = document.createElement('div');
  weatherDescription.classList.add('weather-description');
  weatherDescription.innerText = descriptionData;
  return weatherDescription;
}

function createWindDetails(windData) {
  const windDetails = document.createElement('div');
  windDetails.classList.add('weather-detail');

  const windDetailIcon = document.createElement('i');
  windDetailIcon.classList.add('fas', 'fa-wind');

  const windDetail = document.createElement('div');
  windDetail.classList.add('wind-details');

  const windDetailTitle = document.createElement('p');
  windDetailTitle.innerText = 'Wind';

  const windDetailValue = document.createElement('p');
  windDetailValue.classList.add('wind-value');
  windDetailValue.innerText = `${windData} m/s`;

  windDetail.append(windDetailTitle, windDetailValue);
  windDetails.append(windDetailIcon, windDetail);
  return windDetails;
}

function createHumidityDetails(humidityData) {
  const humidityDetails = document.createElement('div');
  humidityDetails.classList.add('weather-detail');

  const humidityDetailIcon = document.createElement('i');
  humidityDetailIcon.classList.add('fas', 'fa-tint');

  const humidityDetail = document.createElement('div');
  humidityDetail.classList.add('humidity-details');

  const humidityDetailTitle = document.createElement('p');
  humidityDetailTitle.innerText = 'Humidity';
  const humidityDetailValue = document.createElement('p');
  humidityDetailValue.classList.add('humidity-value');
  humidityDetailValue.innerText = `${humidityData}%`;

  humidityDetail.append(humidityDetailTitle, humidityDetailValue);
  humidityDetails.append(humidityDetailIcon, humidityDetail);
  return humidityDetails;
}

function createPressureDetails(pressureData) {
  const pressureDetails = document.createElement('div');
  pressureDetails.classList.add('weather-detail');

  const pressureDetailIcon = document.createElement('i');
  pressureDetailIcon.classList.add('fas', 'fa-compress-alt');

  const pressureDetail = document.createElement('div');
  pressureDetail.classList.add('pressure-details');

  const pressureDetailTitle = document.createElement('p');
  pressureDetailTitle.innerText = 'Pressure';
  const pressureDetailValue = document.createElement('p');
  pressureDetailValue.classList.add('pressure-value');
  pressureDetailValue.innerText = `${pressureData} hPa`;

  pressureDetail.append(pressureDetailTitle, pressureDetailValue);
  pressureDetails.append(pressureDetailIcon, pressureDetail);
  return pressureDetails;
}

function createWeatherHeader(weatherDataObject) {
  const weatherHeader = document.createElement('div');
  const cityName = document.createElement('h2');
  cityName.id = 'cityName';
  cityName.innerText = weatherDataObject.cityName;
  const currentDateTime = document.createElement('p');
  currentDateTime.id = 'currentDateTime';
  currentDateTime.innerText = weatherDataObject.searchDate;
  weatherHeader.append(cityName, currentDateTime);

  return weatherHeader;
}

function createLastUpdated(searchTime) {
  const lastUpdated = document.createElement('div');
  lastUpdated.classList.add('last-updated');
  const lastUpdatedIcon = document.createElement('i');
  lastUpdatedIcon.classList.add('fas', 'fa-history');
  const lastUpdatedText = document.createElement('span');
  lastUpdatedText.id = 'lastUpdated';
  lastUpdatedText.innerText = searchTime;
  lastUpdated.append(lastUpdatedIcon, lastUpdatedText);

  return lastUpdated;
}

function createHistoryItem(cityNameString) {
  const historyItem = document.createElement('div');
  historyItem.classList.add('history-item');
  const historyItemCity = document.createElement('div');
  historyItemCity.classList.add('history-item-city');

  const cityIcon = document.createElement('div');
  cityIcon.classList.add('city-icon');

  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-map-marker-alt');
  cityIcon.appendChild(icon);

  const cityInfo = document.createElement('div');
  cityInfo.classList.add('city-info');

  const cityName = document.createElement('h3');
  cityName.innerText = cityNameString;

  cityInfo.append(cityName);
  historyItemCity.append(cityIcon, cityInfo);
  historyItem.append(historyItemCity);

  return historyItem;
}
