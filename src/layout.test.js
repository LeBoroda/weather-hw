import { runLayout } from './layout';

describe('Layout Weather app test', () => {
  let el;
  beforeEach(() => {
    el = document.createElement('div');
    el.id = 'weatherApp';
    document.body.appendChild(el);
    runLayout(el);
  });
  afterEach(() => {
    document.body.removeChild(el);
    el = null;
  });
  describe('Is function test', () => {
    test('Is runLayout() a function', () => {
      expect(runLayout).toBeInstanceOf(Function);
    });
  });
  describe('Markup test', () => {
    test('App entry exists', () => {
      expect(el).not.toBeNull();
    });
    test('Header exists', () => {
      expect(el.querySelector('header')).not.toBeNull();
    });
    test('Main content exists', () => {
      expect(el.querySelector('main')).not.toBeNull();
    });
    test('Footer exists', () => {
      expect(el.querySelector('footer')).not.toBeNull();
    });
    test('Search section exists', () => {
      expect(el.querySelector('.search-section')).not.toBeNull();
    });
    test('DesktopContainer exists', () => {
      expect(el.querySelector('.desktop-container')).not.toBeNull();
    });
    test('History section exists', () => {
      expect(el.querySelector('.history-section')).not.toBeNull();
    });
    test('Search card exists', () => {
      expect(el.querySelector('.card')).not.toBeNull();
    });
    test('Search Form exists', () => {
      expect(el.querySelector('#cityForm')).not.toBeNull();
    });
  });
});
