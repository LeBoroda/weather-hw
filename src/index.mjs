import './styles/style.css';
import {
  clearHistory,
  clearSearchInput,
  enableSearchButton,
  performSearch,
  runLayout,
  showHistory,
} from './layout.js';

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
