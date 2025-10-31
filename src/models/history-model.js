const STORAGE_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 10;

export class HistoryModel {
  constructor() {
    this.history = this.loadHistory();
  }

  loadHistory() {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error('Failed to load history', error);
      return [];
    }
  }

  persistHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save history', error);
    }
  }

  saveToHistory(cityName) {
    if (!cityName) return;
    this.history = this.history.filter((item) => item !== cityName);
    this.history.unshift(cityName);

    if (this.history.length > MAX_HISTORY_ITEMS) {
      this.history.pop();
    }

    this.persistHistory();
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
    this.persistHistory();
  }
}
