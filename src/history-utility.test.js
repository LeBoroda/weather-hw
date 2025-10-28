import {
  clearSearchHistory,
  getSearchHistory,
  saveSearchHistory,
} from './history-utility';

describe('LocalStorage tests', () => {
  describe('Is function tests', () => {
    it('saveSearchHistory() should be function', () => {
      expect(saveSearchHistory).toBeInstanceOf(Function);
    });
    it('clearSearchHistory() should be function', () => {
      expect(clearSearchHistory).toBeInstanceOf(Function);
    });
    it('getSearchHistory() should be function', () => {
      expect(getSearchHistory).toBeInstanceOf(Function);
    });
  });
  describe('LocalStorage functions test', () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it('saveSearchHistory adds city', () => {
      saveSearchHistory('TestCity');
      const history = JSON.parse(localStorage.getItem('searchHistory'));
      expect(history).toContain('TestCity');
    });
    it('saveSearchHistory does not duplicate city', () => {
      saveSearchHistory('TestCity');
      saveSearchHistory('TestCity');
      const history = JSON.parse(localStorage.getItem('searchHistory'));
      expect(history).toEqual(['TestCity']);
    });
    it('saveSearchHistory limits to 10 entries', () => {
      for (let i = 1; i <= 11; i++) saveSearchHistory('TestCity' + i);
      const history = JSON.parse(localStorage.getItem('searchHistory'));
      expect(history).toHaveLength(10);
      expect(history).not.toContain('TestCity1');
    });
    it('clearSearchHistory() removes history', () => {
      for (let i = 1; i <= 10; i++) saveSearchHistory('TestCity' + i);
      clearSearchHistory();
      expect(localStorage.getItem('searchHistory')).toBeNull();
    });
    it('getSearchHistory returns empty array if no history present', () => {
      expect(getSearchHistory()).toEqual([]);
    });
    it('getSearchHistory returns history array when history is present', () => {
      saveSearchHistory('TestCity');
      expect(getSearchHistory()).toEqual(['TestCity']);
    });
  });
});
