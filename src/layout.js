export function runLayout(wrapperElement) {
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
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'cityInput';
  searchInput.placeholder = 'Enter city name';
  searchInput.setAttribute('aria-label', 'City name');
  const clearInputButton = document.createElement('button');
  clearInputButton.type = 'button';
  clearInputButton.id = 'clearButton';
  clearInputButton.classList.add('clear-button');
  clearInputButton.setAttribute('aria-label', 'Clear input');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-times-circle');
  clearInputButton.appendChild(icon);
  inputWrapper.append(searchInput, clearInputButton);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  searchButton.type = 'submit';
  searchButton.classList.add('btn-primary');
  searchButton.disabled = true;
  searchButton.innerText = 'Search';

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
  historyList.appendChild(emptyHistoryStateContainer);
  historySectionResultContainer.append(historyList);

  const historyActions = document.createElement('div');
  historyActions.classList.add('history-actions');
  const clearHistoryButton = document.createElement('button');
  clearHistoryButton.classList.add('btn-secondary');
  clearHistoryButton.disabled = true;
  const clearHistoryButtonIcon = document.createElement('i');
  clearHistoryButtonIcon.classList.add('fas', 'fa-trash-alt');
  const clearHistoryButtonText = document.createElement('span');
  clearHistoryButtonText.innerText = ' Clear History ';
  clearHistoryButton.append(clearHistoryButtonIcon, clearHistoryButtonText);
  historyActions.appendChild(clearHistoryButton);
  historyCard.append(
    historySectionHeader,
    historySectionResultContainer,
    historyActions,
  );
  historySection.appendChild(historyCard);
  sidebar.appendChild(historySection);
  desktopContainer.append(mainContent, sidebar);
  main.appendChild(desktopContainer);

  const footer = document.createElement('footer');
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('container');
  const copyright = document.createElement('p');
  copyright.innerText = `Weather Forecast StanSky App \u00A9 ${new Date().getFullYear()}`;
  const sources = document.createElement('p');
  sources.innerText = 'Weather data provided by OpenWeatherMap';
  footerContainer.append(copyright, sources);
  footer.appendChild(footerContainer);
  wrapperElement.append(header, main, footer);
}
