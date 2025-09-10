import {
  showHistory,
  clearSearchInput,
  drawFooter,
  drawHeader,
  drawMain,
  enableSearchButton,
  performSearch,
  runLayout,
  showMap,
  showWeather,
} from './layout';

describe('App test suite', () => {
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
    test('Is drawHeader() a function', () => {
      expect(drawHeader).toBeInstanceOf(Function);
    });
    test('Is drawFooter() a function', () => {
      expect(drawFooter).toBeInstanceOf(Function);
    });
    test('Is drawMain() a function', () => {
      expect(drawMain).toBeInstanceOf(Function);
    });
    test('Is enableSearchButton() a function', () => {
      expect(enableSearchButton).toBeInstanceOf(Function);
    });
    test('Is clearSearchInput() a function', () => {
      expect(clearSearchInput).toBeInstanceOf(Function);
    });
    test('Is performSearch() a function', () => {
      expect(performSearch).toBeInstanceOf(Function);
    });
    test('Is showHistory() a function', () => {
      expect(showHistory).toBeInstanceOf(Function);
    });
    test('Is showWeather() a function', () => {
      expect(showWeather).toBeInstanceOf(Function);
    });
    test('Is showMap() a function', () => {
      expect(showMap).toBeInstanceOf(Function);
    });
  });

  describe('Weather app layout test', () => {
    describe('Markup test', () => {
      test('Wrapper element for app entry exists', () => {
        expect(el).not.toBeNull();
      });
      test('Header exists', () => {
        expect(el.querySelector('header')).not.toBeNull();
      });

      test('Main exists', () => {
        expect(el.querySelector('main')).not.toBeNull();
      });

      test('Footer exists', () => {
        expect(el.querySelector('footer')).not.toBeNull();
      });

      test('Header container with title icon and text exists', () => {
        const headerContainer = el.querySelector('.container.header-container');
        expect(headerContainer).not.toBeNull();

        const headerTitle = headerContainer.querySelector('h1');
        expect(headerTitle).not.toBeNull();

        expect(headerTitle.querySelector('i')).not.toBeNull();
        expect(headerTitle.querySelector('i')).toHaveClass(
          'fas',
          'fa-cloud-sun',
        );

        expect(headerTitle.querySelector('span')).not.toBeNull();
        expect(headerTitle.querySelector('span').innerText).toContain(
          'Weather Forecast',
        );
      });

      test('Footer container with copyright and sources elements and text exists', () => {
        const footerContainer = el.querySelector('footer .container');
        expect(footerContainer).not.toBeNull();

        const paragraphs = footerContainer.querySelectorAll('p');
        expect(paragraphs.length).toBeGreaterThanOrEqual(2);

        expect(paragraphs[0]).not.toBeNull();
        expect(paragraphs[0].innerText).toContain(
          'Weather Forecast StanSky App',
        );

        expect(paragraphs[1]).not.toBeNull();
        expect(paragraphs[1].innerText).toContain('Weather data provided by ');
      });

      test('Search section card with header and search form exists', () => {
        const searchSection = el.querySelector('main .search-section');
        expect(searchSection).not.toBeNull();

        const searchCard = searchSection.querySelector('.card');
        expect(searchCard).not.toBeNull();

        expect(searchCard.querySelector('h2').innerText).toContain(
          'Search for a city',
        );
        expect(el.querySelector('#cityForm')).not.toBeNull();
      });

      test('Search input wrapper with input, clear button exists exists', () => {
        const inputWrapper = el.querySelector('#cityForm .input-wrapper');
        expect(inputWrapper).not.toBeNull();

        expect(inputWrapper.querySelector('#cityInput')).not.toBeNull();
        expect(inputWrapper.querySelector('#clearButton')).not.toBeNull();
        expect(inputWrapper.querySelector('#clearButton i')).toHaveClass(
          'fas',
          'fa-times-circle',
        );
      });

      test('Search button exists', () => {
        const searchButton = el.querySelector('#searchButton');
        expect(searchButton).not.toBeNull();
        expect(searchButton.innerText).toContain('Search');
      });

      test('Weather section exists', () => {
        expect(el.querySelector('.weather-section')).not.toBeNull();
      });
      test('Weather card with empty state exists', () => {
        const weatherCard = el.querySelector('.card');
        const emptyStateContainer = el.querySelector('.state-container');
        const weatherDataContainer = el.querySelector('#weatherData');
        expect(weatherCard).not.toBeNull();
        expect(emptyStateContainer).not.toBeNull();
        expect(weatherDataContainer).not.toBeNull();
        expect(emptyStateContainer.querySelector('.state-icon i')).toHaveClass(
          'fas',
          'fa-cloud-sun',
        );
        expect(emptyStateContainer.querySelector('h3').innerText).toContain(
          'No weather data to display',
        );
        expect(emptyStateContainer.querySelector('p').innerText).toContain(
          'Search for a city to see the current weather',
        );
        expect(weatherDataContainer).toHaveClass('hidden');
      });
      test('Map section with header exists', () => {
        const mapSection = el.querySelector('.map-section');
        const mapSectionCard = mapSection.querySelector('.card');
        const sectionHeader = mapSectionCard.querySelector('.section-header');
        expect(mapSection).not.toBeNull();
        expect(mapSectionCard).not.toBeNull();
        expect(sectionHeader).not.toBeNull();
        expect(sectionHeader.querySelector('h2 i')).toHaveClass(
          'fas',
          'fa-map-marker-alt',
        );
        expect(sectionHeader.querySelector('h2 span').innerText).toContain(
          ' Location Map ',
        );
      });
      test('Map container with empty state exists', () => {
        const mapContainer = el.querySelector('.map-container');
        const mapStateContainer =
          mapContainer.querySelector('.state-container');
        expect(mapContainer).not.toBeNull();
        expect(mapStateContainer).not.toBeNull();
        expect(mapStateContainer.querySelector('i')).toHaveClass(
          'fas',
          'fa-map',
        );
        expect(mapStateContainer.querySelector('p').innerText).toContain(
          'Search for a city to display its map',
        );
      });
      test('Sidebar with header exists', () => {
        const sidebar = el.querySelector('.sidebar');
        const historySection = sidebar.querySelector('.history-section');
        const historyCard = historySection.querySelector('.card');
        const historySectionHeader =
          historyCard.querySelector('.section-header');
        expect(sidebar).not.toBeNull();
        expect(historySection).not.toBeNull();
        expect(historyCard).not.toBeNull();
        expect(historySectionHeader).not.toBeNull();
        expect(historySectionHeader.querySelector('h2 i')).toHaveClass(
          'fas',
          'fa-history',
        );
        expect(
          historySectionHeader.querySelector('h2 span').innerText,
        ).toContain(' Search History ');
      });
      test('History list with empty state exists', () => {
        const historyContainer = el.querySelector('.history-container');
        const historyList = historyContainer.querySelector('.history-list');
        const emptyHistory = historyList.querySelector('.state-container');
        expect(historyContainer).not.toBeNull();
        expect(historyList).not.toBeNull();
        expect(emptyHistory).not.toBeNull();
        expect(emptyHistory.querySelector('i')).toHaveClass('fas', 'fa-search');
        expect(emptyHistory.querySelector('p').innerText).toContain(
          'Your search history will appear here',
        );
      });
      test('Clear search history button with text and icon exists', () => {
        const button = el.querySelector('.history-actions button');
        expect(button).not.toBeNull();
        expect(button.querySelector('i')).toHaveClass('fas', 'fa-trash-alt');
        expect(button.querySelector('span').innerText).toContain(
          ' Clear History ',
        );
        expect(button).toBeDisabled();
      });
    });
  });

  describe('App functionality tests', () => {
    let searchInput, searchButton;

    beforeEach(() => {
      searchInput = el.querySelector('#cityInput');
      searchButton = el.querySelector('#searchButton');
    });

    describe('Toggle search button', () => {
      test('Search button disabled on empty input', () => {
        searchInput.value = '';
        enableSearchButton(searchInput, searchButton);
        expect(searchButton).toBeDisabled();
      });
      test('Search button enabled on input', async () => {
        searchInput.value = 'test';
        enableSearchButton(searchInput, searchButton);
        expect(searchButton).toBeEnabled();
      });
    });
    describe('Clear search input with button', () => {
      test('Search input is cleared when clear input button clicked', () => {
        searchInput.value = 'test';
        clearSearchInput(searchInput, searchButton);
        expect(searchInput.value).toBe('');
      });
      test('Search button is disabled after search input cleared', () => {
        searchInput.value = 'test';
        clearSearchInput(searchInput, searchButton);
        expect(searchButton).toBeDisabled();
      });
    });
  });
});
