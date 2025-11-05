import { WeatherView } from './weather-view';

function getVisibleHistoryItemsFromDOM(root) {
  const items = [...root.querySelectorAll('.history-list .history-item h3')];
  return items.map((h3) => h3.innerText);
}

describe('WeatherView rendering tests', () => {
  let root;
  let view;

  beforeEach(() => {
    document.body.innerHTML = '';
    root = document.createElement('div');
    root.id = 'weatherApp';
    document.body.appendChild(root);

    view = new WeatherView();
    view.initialize(root); // draws layout and caches elements
  });

  afterEach(() => {
    document.body.removeChild(root);
    root = null;
    view = null;
  });

  describe('Layout presence and helpers are functions (via instance)', () => {
    it('instance methods should exist', () => {
      expect(view.drawLayout).toBeInstanceOf(Function);
      expect(view.drawHeader).toBeInstanceOf(Function);
      expect(view.drawMain).toBeInstanceOf(Function);
      expect(view.drawFooter).toBeInstanceOf(Function);
      expect(view.drawWeather).toBeInstanceOf(Function);
      expect(view.drawHistory).toBeInstanceOf(Function);
      expect(view.clearVisibleHistory).toBeInstanceOf(Function);
      expect(view.enableSearchButton).toBeInstanceOf(Function);
      expect(view.clearSearchInput).toBeInstanceOf(Function);
      expect(view.drawMap).toBeInstanceOf(Function);
    });
  });

  describe('Header layout', () => {
    it('creates header with icon and title', () => {
      const header = root.querySelector('header');
      const headerContainer = header.querySelector(
        '.container.header-container',
      );
      const title = headerContainer.querySelector('h1');
      const icon = title.querySelector('i');
      const span = title.querySelector('span');

      expect(header).not.toBeNull();
      expect(headerContainer).not.toBeNull();
      expect(icon).not.toBeNull();
      expect(icon).toHaveClass('fas', 'fa-cloud-sun');
      expect(span).not.toBeNull();
      // Actual text in WeatherView
      expect(span.innerText).toContain('Weather Forecast');
    });
  });

  describe('Footer layout', () => {
    it('creates footer with two paragraphs', () => {
      const footer = root.querySelector('footer');
      const container = footer.querySelector('.container');
      const ps = container.querySelectorAll('p');
      expect(footer).not.toBeNull();
      expect(container).not.toBeNull();
      expect(ps.length).toBe(2);
    });

    it('has copyright on first line', () => {
      const footer = root.querySelector('footer');
      const ps = footer.querySelectorAll('.container p');
      const year = new Date().getFullYear();
      expect(ps[0].innerText).toContain(
        `Weather Forecast StanSky App \u00A9 ${year}`,
      );
    });

    it('has sources text and link on second line', () => {
      const footer = root.querySelector('footer');
      const ps = footer.querySelectorAll('.container p');
      expect(ps[1].innerText).toContain('Weather data provided by');
      const a = ps[1].querySelector('a');
      expect(a).not.toBeNull();
      expect(a.innerText).toContain('OpenWeatherMap');
    });
  });

  describe('Main layout and search form', () => {
    it('has main and search section', () => {
      const main = root.querySelector('main');
      expect(main).not.toBeNull();
      expect(main.querySelector('.search-section')).not.toBeNull();
    });

    it('search section has header text', () => {
      const searchSection = root.querySelector('main .search-section');
      expect(searchSection.querySelector('.card h2').innerText).toContain(
        'Search for a city',
      );
    });

    it('search form has input, search button, and clear button', () => {
      const form = root.querySelector('#cityForm');
      expect(form).not.toBeNull();
      expect(form.querySelector('#searchButton')).not.toBeNull();
      expect(form.querySelector('#searchButton').innerText).toContain('Search');
      expect(form.querySelector('#cityInput')).not.toBeNull();
      expect(form.querySelector('#cityInput').placeholder).toContain(
        'Enter city name',
      );
      expect(form.querySelector('#clearButton')).not.toBeNull();
      expect(form.querySelector('#clearButton>i')).toHaveClass(
        'fas',
        'fa-times-circle',
      );
    });
  });

  describe('Weather section (initial state)', () => {
    it('contains state container and hidden data area', () => {
      const weatherSection = root.querySelector('.weather-section');
      expect(weatherSection.querySelector('.state-container')).not.toBeNull();
      expect(root.querySelector('#weatherData')).toHaveClass('hidden');
    });

    it('empty weather card content matches', () => {
      const card = root.querySelector('.weather-section .state-container');
      expect(card.querySelector('i')).toHaveClass('fas', 'fa-cloud-sun');
      expect(card.querySelector('h3').innerText).toContain(
        'No weather data to display',
      );
      expect(card.querySelector('p').innerText).toContain(
        'Search for a city to see the current weather',
      );
    });
  });

  describe('Map section', () => {
    it('creates map section with header and empty card', () => {
      const mapSection = root.querySelector('.desktop-container .map-section');
      expect(mapSection.querySelector('.section-header')).not.toBeNull();
      expect(mapSection.querySelector('.section-header i')).toHaveClass(
        'fas',
        'fa-map-marker-alt',
      );
      expect(
        mapSection.querySelector('.section-header span').innerText,
      ).toContain('Location Map');
      const mapCard = mapSection.querySelector('.map-container');
      expect(mapCard.querySelector('i')).toHaveClass('fas', 'fa-map');
      expect(mapCard.querySelector('p').innerText).toContain(
        'Search for a city to display its map',
      );
    });

    it('drawMap hides empty state and inserts image, replacing previous', () => {
      const mapContainer = root.querySelector('.map-section .map-container');
      const empty = mapContainer.querySelector('.state-container');
      view.drawMap('test-url-1');
      expect(empty).toHaveClass('hidden');
      expect(mapContainer.querySelectorAll('#map').length).toBe(1);
      expect(mapContainer.querySelector('#map img')).toHaveAttribute(
        'src',
        'test-url-1',
      );

      view.drawMap('test-url-2');
      expect(mapContainer.querySelectorAll('#map').length).toBe(1);
      expect(mapContainer.querySelector('#map img')).toHaveAttribute(
        'src',
        'test-url-2',
      );
    });
  });

  describe('Sidebar and history section', () => {
    it('contains history section with header and actions', () => {
      const sidebar = root.querySelector('.desktop-container .sidebar');
      const historySection = sidebar.querySelector('.history-section');
      expect(historySection).not.toBeNull();
      const card = historySection.querySelector('.card');
      const header = card.querySelector('.section-header');
      expect(header.querySelector('i')).toHaveClass('fas', 'fa-history');
      // Actual text in WeatherView
      expect(header.querySelector('span').innerText).toContain(
        'Search History',
      );

      const historyList = historySection.querySelector('.history-list');
      const empty = historyList.querySelector('.state-container');
      expect(historyList).not.toBeNull();
      expect(empty).not.toBeNull();
      expect(empty.querySelector('i')).toHaveClass('fas', 'fa-search');
      expect(empty.querySelector('p').innerText).toContain(
        'Your search history will appear here',
      );

      const actions = historySection.querySelector('.history-actions');
      const btn = actions.querySelector('.btn-secondary');
      expect(btn).not.toBeNull();
      expect(btn.querySelector('i')).toHaveClass('fas', 'fa-trash-alt');
      // Actual label
      expect(btn.querySelector('span').innerText).toContain('Clear History');
    });

    it('drawHistory hides empty state, enables button, and renders items', () => {
      const historyList = root.querySelector('.history-list');
      view.drawHistory(['London', 'Paris', 'Moscow']);
      expect(historyList.querySelector('.state-container')).toHaveClass(
        'hidden',
      );
      expect(root.querySelector('.history-actions button')).toBeEnabled();
      expect(historyList.querySelectorAll('.history-item').length).toBe(3);

      view.drawHistory([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(historyList.querySelectorAll('.history-item').length).toBe(10);

      // Single item structure
      view.drawHistory(['Moscow']);
      expect(historyList.querySelector('h3').innerText).toContain('Moscow');
      expect(historyList.querySelector('i')).toHaveClass(
        'fas',
        'fa-map-marker-alt',
      );
    });

    it('clearVisibleHistory removes all and disables button', () => {
      const historyList = root.querySelector('.history-list');
      view.drawHistory(['London', 'Paris', 'Moscow']);
      view.clearVisibleHistory();
      expect(historyList.querySelectorAll('.history-item').length).toBe(0);
      expect(root.querySelector('.history-actions button')).toBeDisabled();
    });

    it('getVisibleHistoryItems helper returns names in DOM order', () => {
      view.drawHistory(['London', 'Paris', 'Moscow']);
      const names = getVisibleHistoryItemsFromDOM(root);
      // drawHistory prepends, so final DOM order: Moscow, Paris, London
      expect(names).toEqual(['Moscow', 'Paris', 'London']);
    });
  });

  describe('Elements modification helpers', () => {
    it('enableSearchButton(true) enables the button', () => {
      const btn = root.querySelector('#searchButton');
      view.enableSearchButton(true);
      expect(btn).toBeEnabled();
    });

    it('clearSearchInput() clears input and disables search', () => {
      const input = root.querySelector('#cityInput');
      const btn = root.querySelector('#searchButton');
      input.value = 'Test';
      view.enableSearchButton(true);
      expect(btn).toBeEnabled();

      view.clearSearchInput();
      expect(btn).toBeDisabled();
      expect(input.value).toBe('');
    });
  });

  describe('Weather data rendering', () => {
    it('drawWeather displays header, timestamps, icon, temp, description and details', () => {
      const sample = {
        name: 'TestName',
        cityName: 'TestName',
        weather: [{ icon: '28n', description: 'Hells Fire' }],
        main: { temp: 666, humidity: 500, pressure: 1313 },
        wind: { speed: 13 },
        // Note: drawWeather itself sets searchTime/searchDate before rendering
      };

      view.drawWeather(sample);

      const weatherData = root.querySelector('#weatherData');
      const card = root.querySelector('.weather-section .card');
      expect(card.querySelector('.state-container')).toHaveClass('hidden');
      expect(weatherData).not.toHaveClass('hidden');

      // Header container and last updated
      expect(weatherData.querySelector('.weather-header')).not.toBeNull();
      expect(weatherData.querySelector('.last-updated i')).toHaveClass(
        'fas',
        'fa-history',
      );

      // Icon, temp, description
      expect(weatherData.querySelector('.weather-icon img').src).toContain(
        '28n',
      );
      expect(weatherData.querySelector('.temperature').innerText).toContain(
        '666°C',
      );
      expect(
        weatherData.querySelector('.weather-description').innerText,
      ).toContain('Hells Fire');

      // Details
      expect(
        weatherData.querySelector('.wind-details .wind-value').innerText,
      ).toContain('13 m/s');
      expect(
        weatherData.querySelector('.humidity-details .humidity-value')
          .innerText,
      ).toContain('500');
      expect(
        weatherData.querySelector('.pressure-details .pressure-value')
          .innerText,
      ).toContain('1313');
    });
  });
});
