import './styles/style.css';
import {
    clearHistory,
    clearSearchInput,
    enableSearchButton,
    runLayout,
    showHistory, showMap, showWeather,
} from './layout.js';
import {saveSearchHistory} from "./utils.js";
import {getCityWeather} from "./apiUtils.js";

runLayout(document.getElementById('weatherApp'));

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
  clearHistoryButton.addEventListener('click', () => clearHistory());

  showHistory();
});

export async function performSearch(searchInput, searchButton) {
    try {
        const cityWeatherObject = await getCityWeather(searchInput.value);
        saveSearchHistory(searchInput.value);
        showWeather(cityWeatherObject);
        await showHistory();
        showMap(cityWeatherObject);
        clearSearchInput(searchInput, searchButton)
    } catch (error) {
        console.error(error);
    }
}
