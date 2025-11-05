import { HistoryModel } from './history-model';

const STORAGE_KEY = 'searchHistory';

describe('HistoryModel', () => {
  let model;
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    model = new HistoryModel();
  });

  afterEach(() => {
    model = null;
  });

  it('initializes with empty history when no storage present', () => {
    expect(model.getHistory()).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('loads existing history from localStorage on construction', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['CityA', 'CityB']));
    const model = new HistoryModel();
    expect(model.getHistory()).toEqual(['CityA', 'CityB']);
  });

  it('saveToHistory adds a city and persists it at the front', () => {
    model.saveToHistory('TestCity');
    expect(model.getHistory()).toEqual(['TestCity']);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual(['TestCity']);
  });

  it('saveToHistory de-duplicates and moves city to front', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['A', 'B', 'C']));
    const model = new HistoryModel();
    model.saveToHistory('B');
    expect(model.getHistory()).toEqual(['B', 'A', 'C']);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual([
      'B',
      'A',
      'C',
    ]);
  });

  it('saveToHistory limits history length to 10', () => {
    for (let i = 1; i <= 10; i++) {
      model.saveToHistory(`City${i}`);
    }
    // Add one more to exceed the cap
    model.saveToHistory('City11');
    const history = model.getHistory();
    expect(history).toHaveLength(10);
    // Newest at front, oldest dropped
    expect(history[0]).toBe('City11');
    expect(history).not.toContain('City1');
  });

  it('clearHistory empties list and persists [] (keeps the key)', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['X', 'Y']));
    const model = new HistoryModel();
    model.clearHistory();
    expect(model.getHistory()).toEqual([]);
    // Model writes "[]" not null
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[]');
  });

  it('getHistory returns a copy (external mutation does not affect internal state)', () => {
    model.saveToHistory('TestCity');
    const copy = model.getHistory();
    copy.push('Injected');
    // Internal state remains unchanged
    expect(model.getHistory()).toEqual(['TestCity']);
  });

  it('saveToHistory ignores falsy/empty input', () => {
    model.saveToHistory('');
    model.saveToHistory(null);
    model.saveToHistory(undefined);
    expect(model.getHistory()).toEqual([]);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
