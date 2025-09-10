import {
  capitaliseFirstLetter,
  clearSearchHistory,
  getCityWeather,
  getCurrentDateAsText,
  getCurrentTimeAsText,
  getSearchHistory,
  saveSearchHistory,
} from './utils';

export function runLayout(wrapperElement) {
  drawHeader(wrapperElement);
  drawMain(wrapperElement);
  drawFooter(wrapperElement);
}

export function drawHeader(wrapperElement) {
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
  wrapperElement.append(header);
}

export function drawFooter(wrapperElement) {
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
  wrapperElement.append(footer);
}

export function drawMain(wrapperElement) {
  const main = document.createElement('main');
  main.classList.add('container');

  const searchSection = document.createElement('section');
  searchSection.classList.add('search-section');
  const searchCard = document.createElement('div');
  searchCard.classList.add('card');
  searchSection.appendChild(searchCard);
  const searchCardHeader = document.createElement('h2');
  searchCardHeader.innerText = 'Search for a city';
  const searchForm = document.createElement('form');
  searchForm.id = 'cityForm';

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');

  const searchInput = drawSearchInput();
  const clearInputButton = drawClearInputButton();

  inputWrapper.append(searchInput, clearInputButton);

  const searchButton = drawSearchButton();
  searchForm.append(inputWrapper, searchButton);

  searchCard.append(searchCardHeader, searchForm);
  main.appendChild(searchSection);

  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('desktop-container');

  const mainContent = document.createElement('div');
  mainContent.classList.add('main-content');

  const weatherSection = document.createElement('section');
  weatherSection.classList.add('weather-section');
  const weatherCard = document.createElement('div');
  weatherCard.classList.add('card');
  const emptyStateContainer = drawWeatherSectionEmptyState();
  const weatherDataContainer = document.createElement('div');
  weatherDataContainer.id = 'weatherData';
  weatherDataContainer.classList.add('hidden');
  weatherCard.append(emptyStateContainer, weatherDataContainer);
  weatherSection.appendChild(weatherCard);

  const mapSection = document.createElement('section');
  mapSection.classList.add('map-section');
  const mapSectionCard = document.createElement('div');
  mapSectionCard.classList.add('card');
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

  const mapSectionMapContainer = document.createElement('div');
  mapSectionMapContainer.classList.add('map-container');
  const mapSectionEmptyMapStateContainer =
    drawMapSectionEmptyMapStateContainer();
  mapSectionMapContainer.appendChild(mapSectionEmptyMapStateContainer);
  mapSectionCard.append(mapSectionHeader, mapSectionMapContainer);
  mapSection.appendChild(mapSectionCard);

  mainContent.append(weatherSection, mapSection);

  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');
  const historySection = document.createElement('section');
  historySection.classList.add('history-section');
  const historyCard = document.createElement('div');
  historyCard.classList.add('card');
  const historySectionHeader = document.createElement('div');
  historySectionHeader.classList.add('section-header');
  const historySectionHeaderContainer = document.createElement('h2');
  const historySectionHeaderIcon = document.createElement('i');
  historySectionHeaderIcon.classList.add('fas', 'fa-history');
  const historySectionHeaderText = document.createElement('span');
  historySectionHeaderText.innerText = ' Search History ';
  historySectionHeaderContainer.append(
    historySectionHeaderIcon,
    historySectionHeaderText,
  );
  historySectionHeader.appendChild(historySectionHeaderContainer);

  const historySectionResultContainer = document.createElement('div');
  historySectionResultContainer.classList.add('history-container');
  const historyList = document.createElement('div');
  historyList.classList.add('history-list');
  const emptyHistoryStateContainer = drawEmptyHistoryStateContainer();
  historyList.appendChild(emptyHistoryStateContainer);

  const historyActions = document.createElement('div');
  historyActions.classList.add('history-actions');
  const clearHistoryButton = drawClearHistoryButton();
  historyActions.appendChild(clearHistoryButton);

  historySectionResultContainer.append(historyList, historyActions);
  historyCard.append(historySectionHeader, historySectionResultContainer);
  historySection.appendChild(historyCard);
  sidebar.appendChild(historySection);

  desktopContainer.append(mainContent, sidebar);
  main.appendChild(desktopContainer);

  wrapperElement.append(main);
}

export function drawSearchInput() {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'cityInput';
  searchInput.placeholder = 'Enter city name';
  searchInput.setAttribute('aria-label', 'City name');
  return searchInput;
}

export function drawSearchButton() {
  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  searchButton.type = 'submit';
  searchButton.classList.add('btn-primary');
  searchButton.disabled = true;
  searchButton.innerText = 'Search';
  return searchButton;
}

export function drawClearInputButton() {
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

export function drawClearHistoryButton() {
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

export function drawWeatherSectionEmptyState() {
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

export function drawMapSectionEmptyMapStateContainer() {
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

export function drawEmptyHistoryStateContainer() {
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

export function enableSearchButton(searchInput, searchButton) {
  searchButton.disabled = searchInput.value.trim() === '';
}

export function clearSearchInput(searchInput, searchButton) {
  searchInput.value = '';
  searchButton.disabled = true;
}

export async function performSearch(searchInput, searchButton) {
  try {
    const cityWeatherObject = await getCityWeather(searchInput.value);
    saveSearchHistory(searchInput.value);
    showWeather(cityWeatherObject);
    showHistory();
    showMap(cityWeatherObject);

    searchInput.value = '';
    searchInput.blur();
    searchButton.disabled = true;
  } catch (error) {
    console.error(error);
  }
}

export function showWeather(cityWeatherObject) {
  const weatherDataContainer = document.querySelector('#weatherData');
  const emptyStateContainer = document.querySelector(
    '.weather-section .state-container',
  );

  const weatherHeaderContainer = document.createElement('div');
  weatherHeaderContainer.classList.add('weather-header');

  weatherDataContainer.innerHTML = '';
  const weatherHeader = drawWeatherHeader(cityWeatherObject.name);

  const lastUpdated = document.createElement('div');
  lastUpdated.classList.add('last-updated');
  const lastUpdatedIcon = document.createElement('i');
  lastUpdatedIcon.classList.add('fas', 'fa-history');
  const lastUpdatedText = document.createElement('span');
  lastUpdatedText.id = 'lastUpdated';
  lastUpdatedText.innerText = getCurrentTimeAsText(new Date());
  lastUpdated.append(lastUpdatedIcon, lastUpdatedText);

  weatherHeaderContainer.append(weatherHeader, lastUpdated);

  const weatherContent = document.createElement('div');
  weatherContent.classList.add('weather-content');
  const currentWeather = document.createElement('div');
  currentWeather.classList.add('current-weather');

  const weatherPrimaryInfo = document.createElement('div');
  weatherPrimaryInfo.classList.add('weather-primary');
  const weatherIconContainer = drawWeatherIconContainer(cityWeatherObject.icon);

  const weatherTempContainer = document.createElement('div');
  weatherTempContainer.classList.add('temperature-container');

  const weatherTemperature = drawWeatherTemperature(cityWeatherObject.temp);
  const weatherDescription = drawWeatherDescription(
    cityWeatherObject.weatherDescription,
  );

  weatherTempContainer.append(weatherTemperature, weatherDescription);

  weatherPrimaryInfo.append(weatherIconContainer, weatherTempContainer);

  const weatherDetails = document.createElement('div');
  weatherDetails.classList.add('weather-details');

  const windDetails = drawWindDetails(cityWeatherObject.wind);

  const humidityDetails = drawHumidityDetails(cityWeatherObject.humidity);

  const pressureDetails = drawPressureDetails(cityWeatherObject.pressure);

  weatherDetails.append(windDetails, humidityDetails, pressureDetails);

  currentWeather.append(weatherPrimaryInfo, weatherDetails);
  weatherContent.appendChild(currentWeather);

  weatherDataContainer.append(weatherHeaderContainer, weatherContent);

  emptyStateContainer.innerHTML = '';
  emptyStateContainer.classList.add('hidden');
  weatherDataContainer.classList.remove('hidden');
}

export async function showHistory() {
  const searchHistory = getSearchHistory();
  const historyList = document.querySelector('.history-list');
  const emptyHistoryStateContainer =
    historyList.querySelector('.state-container');

  if (searchHistory && Array.isArray(searchHistory)) {
    const renderedNames = Array.from(
      historyList.querySelectorAll('.history-item'),
    ).map((item) => {
      const h3 = item.querySelector('.city-info h3');
      return h3 ? h3.innerText : '';
    });
    const newNames = searchHistory.filter(
      (name) => !renderedNames.includes(name),
    );

    for (const searchItem of newNames) {
      const cityWeatherObject = await getCityWeather(searchItem); // await обязательный
      const historyItem = drawHistoryItem(cityWeatherObject);
      historyList.prepend(historyItem);

      const historyItems = historyList.querySelectorAll('.history-item');
      if (historyItems.length > 5) {
        const lastHistoryItem = historyItems[historyItems.length - 1];
        if (lastHistoryItem) historyList.removeChild(lastHistoryItem);
      }
    }
    emptyHistoryStateContainer.classList.add('hidden');
  }
  updateClearHistoryButton();
}

export function drawHistoryItem(cityWeatherObject) {
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
  cityName.innerText = cityWeatherObject.name;

  cityInfo.append(cityName);

  historyItemCity.append(cityIcon, cityInfo);

  const historyItemWeather = document.createElement('div');
  historyItemWeather.classList.add('history-item-weather');

  const currentTemp = document.createElement('p');
  currentTemp.innerText = `${cityWeatherObject.temp}°C`;
  const currentDetails = document.createElement('p');
  currentDetails.innerText = capitaliseFirstLetter(
    cityWeatherObject.weatherDescription,
  );

  historyItemWeather.append(currentTemp, currentDetails);

  historyItem.append(historyItemCity, historyItemWeather);
  return historyItem;
}

export function drawWindDetails(windData) {
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

export function drawHumidityDetails(humidityData) {
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

export function drawPressureDetails(pressureData) {
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

export function drawWeatherHeader(headerData) {
  const weatherHeader = document.createElement('div');
  const cityName = document.createElement('h2');
  cityName.id = 'cityName';
  cityName.innerText = headerData;
  const currentDateTime = document.createElement('p');
  currentDateTime.id = 'currentDateTime';
  currentDateTime.innerText = getCurrentDateAsText(new Date());
  weatherHeader.append(cityName, currentDateTime);
  return weatherHeader;
}

export function drawWeatherIconContainer(iconCode) {
  const weatherIconContainer = document.createElement('div');
  weatherIconContainer.classList.add('weather-icon');
  const weatherIconImg = document.createElement('img');
  weatherIconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconImg.alt = 'Broken Clouds';
  weatherIconContainer.appendChild(weatherIconImg);
  return weatherIconContainer;
}

export function drawWeatherTemperature(tempData) {
  const weatherTemperature = document.createElement('div');
  weatherTemperature.classList.add('temperature');
  weatherTemperature.innerText = `${tempData}°C`;
  return weatherTemperature;
}

export function drawWeatherDescription(descriptionData) {
  const weatherDescription = document.createElement('div');
  weatherDescription.classList.add('weather-description');
  weatherDescription.innerText = descriptionData;
  return weatherDescription;
}

export function updateClearHistoryButton() {
  const clearHistoryButton = document.querySelector('.history-actions button');
  const historyList = document.querySelector('.history-list');
  const historyItems = historyList.querySelectorAll('.history-item');
  clearHistoryButton.disabled = historyItems.length === 0;
}

export function clearHistory() {
  const historyItems = document.querySelectorAll('.history-item');
  historyItems.forEach((item) => item.remove());
  const clearHistoryButton = document.querySelector('.history-actions button');
  clearHistoryButton.disabled = true;
  clearSearchHistory();
}

export function showMap(searchInput) {
  console.log(searchInput.value);
}
