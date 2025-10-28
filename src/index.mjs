import './styles/style.css';
import {
  clearSearchInput,
  clearVisibleHistory,
  drawHistory,
  drawLayout,
  drawMap,
  drawWeather,
  enableSearchButton,
} from './layout.js';
import {
  clearSearchHistory,
  getSearchHistory,
  saveSearchHistory,
} from './history-utility.js';
import { getWeather } from './api-utility.js';
import { getDateAsText, getTimeAsText } from './text-utility.js';

drawLayout(document.getElementById('weatherApp'));

window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#cityInput');
  const clearInput = document.querySelector('#clearButton');
  const searchButton = document.querySelector('#searchButton');
  const clearHistoryButton = document.querySelector('.history-actions button');

  searchInput.addEventListener('input', () =>
    enableSearchButton(searchInput, searchButton),
  );
  clearInput.addEventListener('click', () =>
    clearSearchInput(searchInput, searchButton),
  );
  searchButton.addEventListener('click', () =>
    performSearch(searchInput, searchButton),
  );
  searchInput.addEventListener('submit', () =>
    performSearch(searchInput, searchButton),
  );

  clearHistoryButton.addEventListener('click', () => clearHistory());
});

function performSearch(searchInput, searchButton) {
  getWeather(searchInput.value)
    .then((weather) => {
      weather.searchTime = getTimeAsText(new Date());
      weather.searchDate = getDateAsText(new Date());
      drawWeather(weather);
      saveSearchHistory(weather.cityName);
      drawHistory(getSearchHistory());
      drawMap(weather);
    })
    .catch((error) => {
      console.error('Failed getting weather', error);
    });
  clearSearchInput(searchInput, searchButton);
}

function clearHistory() {
  clearVisibleHistory();
  clearSearchHistory();
}
