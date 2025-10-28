export function saveSearchHistory(cityName) {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!history.includes(cityName)) {
    history.unshift(cityName);
    if (history.length > 10) {
      history.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }
}

export function clearSearchHistory() {
  localStorage.removeItem('searchHistory');
}

export function getSearchHistory() {
  return JSON.parse(localStorage.getItem('searchHistory')) || [];
}
