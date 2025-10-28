import {
  clearSearchInput,
  clearVisibleHistory,
  drawFooter,
  drawHeader,
  drawHistory,
  drawLayout,
  drawMain,
  drawMap,
  drawWeather,
  enableSearchButton,
  getVisibleHistoryItems,
} from './layout';

describe('Layout rendering tests', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
    el.id = 'weatherApp';
    document.body.appendChild(el);
    drawLayout(el);
  });

  afterEach(() => {
    document.body.removeChild(el);
    el = null;
  });

  describe('Is function', () => {
    it('drawLayout() should be function', () => {
      expect(drawLayout).toBeInstanceOf(Function);
    });
    it('drawHeader() should be function', () => {
      expect(drawHeader).toBeInstanceOf(Function);
    });
    it('drawMain() should be function', () => {
      expect(drawMain).toBeInstanceOf(Function);
    });
    it('drawFooter() should be function', () => {
      expect(drawFooter).toBeInstanceOf(Function);
    });
    it('showWeather() should be function', () => {
      expect(drawWeather).toBeInstanceOf(Function);
    });
    it('drawHistory() should be function', () => {
      expect(drawHistory).toBeInstanceOf(Function);
    });
    it('getVisibleHistoryItems() should should be function', () => {
      expect(getVisibleHistoryItems).toBeInstanceOf(Function);
    });
    it('enableSearchButton() should be function', () => {
      expect(enableSearchButton).toBeInstanceOf(Function);
    });
    it('clearSearchInput() should be function', () => {
      expect(clearSearchInput).toBeInstanceOf(Function);
    });
    it('clearVisibleHistory() should be function', () => {
      expect(clearVisibleHistory).toBeInstanceOf(Function);
    });
    it('drawMap() should be function', () => {
      expect(drawMap).toBeInstanceOf(Function);
    });
  });
  describe('Layout visibility', () => {
    it('wrapper element should exist', () => {
      expect(el).not.toBe(null);
    });
    describe('Header layout', () => {
      it('drawHeader() should create header', () => {
        const header = el.querySelector('header');
        const headerContainer = header.querySelector(
          '.container.header-container',
        );
        expect(header).not.toBe(null);
        expect(headerContainer).not.toBe(null);
      });
      it('drawHeader() should create header title with icon', () => {
        const header = el.querySelector('header');
        const headerContainer = header.querySelector(
          '.container.header-container',
        );
        const headerTitle = headerContainer.querySelector('h1');
        expect(headerTitle).not.toBe(null);
        expect(headerTitle.querySelector('i')).not.toBe(null);
        expect(headerTitle.querySelector('i')).toHaveClass(
          'fas',
          'fa-cloud-sun',
        );
      });
      it('drawHeader() should create header title with text', () => {
        const header = el.querySelector('header');
        const headerContainer = header.querySelector(
          '.container.header-container',
        );
        const headerTitle = headerContainer.querySelector('h1');
        expect(headerTitle).not.toBe(null);
        expect(headerTitle.querySelector('span')).not.toBe(null);
        expect(headerTitle.querySelector('span').innerText).toContain(
          'Weather Forecast',
        );
      });
    });
    describe('Footer layout', () => {
      it('drawFooter() should create footer', () => {
        const footer = el.querySelector('footer');
        const footerContainer = footer.querySelector('.container');
        expect(footer).not.toBe(null);
        expect(footerContainer).not.toBe(null);
      });
      it('drawFooter() should create footer with 2 text paragraphs', () => {
        const footer = el.querySelector('footer');
        const footerContainer = footer.querySelector('.container');
        const textParagraphs = footerContainer.querySelectorAll('p');
        expect(textParagraphs.length).toEqual(2);
      });
      it('drawFooter() should create footer with copyright text on first line', () => {
        const footer = el.querySelector('footer');
        const footerContainer = footer.querySelector('.container');
        const textParagraphs = footerContainer.querySelectorAll('p');
        expect(textParagraphs[0]).not.toBe(null);
        expect(textParagraphs[0].innerText).toContain(
          `Weather Forecast StanSky App \u00A9 ${new Date().getFullYear()}`,
        );
      });
      it('drawFooter() should create footer with sources on second line', () => {
        const footer = el.querySelector('footer');
        const footerContainer = footer.querySelector('.container');
        const textParagraphs = footerContainer.querySelectorAll('p');
        expect(textParagraphs[1]).not.toBe(null);
        expect(textParagraphs[1].innerText).toContain(
          'Weather data provided by',
        );
      });
      it('Sources should have source link and text', () => {
        const footer = el.querySelector('footer');
        const footerContainer = footer.querySelector('.container');
        const textParagraphs = footerContainer.querySelectorAll('p');
        expect(textParagraphs[1].querySelector('a')).not.toBe(null);
        expect(textParagraphs[1].querySelector('a').innerText).toContain(
          'OpenWeatherMap',
        );
      });
    });
    describe('Main section layout', () => {
      it('drawMain() should create main section', () => {
        const main = el.querySelector('main');
        expect(main).not.toBe(null);
      });
      describe('Search form tests', () => {
        it('Main section should contain search section', () => {
          const main = el.querySelector('main');
          expect(main.querySelector('.search-section')).not.toBe(null);
        });
        it('Search section should contain header text', () => {
          const main = el.querySelector('main');
          const searchSection = main.querySelector('.search-section');
          expect(searchSection.querySelector('.card h2').innerText).toContain(
            'Search for a city',
          );
        });
        it('Search section should contain search form', () => {
          const searchSection = el.querySelector('main .search-section');
          expect(searchSection.querySelector('#cityForm')).not.toBe(null);
        });
        it('Search form should contain search button', () => {
          const searchForm = el.querySelector('#cityForm');
          expect(searchForm.querySelector('#searchButton')).not.toBe(null);
          expect(searchForm.querySelector('#searchButton').innerText).toContain(
            'Search',
          );
        });
        it('Search form should contain search input with placeholder', () => {
          const searchForm = el.querySelector('#cityForm');
          expect(searchForm.querySelector('#cityInput')).not.toBe(null);
          expect(searchForm.querySelector('#cityInput').placeholder).toContain(
            'Enter city name',
          );
        });
        it('Search form should contain clear input button', () => {
          const searchForm = el.querySelector('#cityForm');
          expect(searchForm.querySelector('#clearButton')).not.toBe(null);
          expect(searchForm.querySelector('#clearButton>i')).toHaveClass(
            'fas',
            'fa-times-circle',
          );
        });
      });
      describe('Main content tests', () => {
        it('Main section should contain content section', () => {
          const main = el.querySelector('main');
          expect(main.querySelector('.desktop-container')).not.toBe(null);
        });
        describe('Weather section tests', () => {
          it('Main info section should contain weather section', () => {
            const mainInfoSection = el.querySelector('main .desktop-container');
            expect(mainInfoSection.querySelector('.weather-section')).not.toBe(
              null,
            );
          });
          it('Weather section should contain weather card without data', () => {
            const weatherSection = el.querySelector('.weather-section');
            expect(weatherSection.querySelector('.state-container')).not.toBe(
              null,
            );
          });
          it('Weather card without data should have icon, header and prompt', () => {
            const weatherCard = el.querySelector(
              '.weather-section .state-container',
            );
            expect(weatherCard.querySelector('i')).not.toBe(null);
            expect(weatherCard.querySelector('i')).toHaveClass(
              'fas',
              'fa-cloud-sun',
            );
            expect(weatherCard.querySelector('h3')).not.toBe(null);
            expect(weatherCard.querySelector('h3').innerText).toContain(
              'No weather data to display',
            );
            expect(weatherCard.querySelector('p')).not.toBe(null);
            expect(weatherCard.querySelector('p').innerText).toContain(
              'Search for a city to see the current weather',
            );
          });
          it('Weather section should contain weather card with data', () => {
            const weatherSection = el.querySelector('.weather-section');
            expect(weatherSection.querySelector('#weatherData')).not.toBe(null);
          });
          it('Weather card with data should be hidden', () => {
            expect(el.querySelector('#weatherData')).toHaveClass('hidden');
          });
        });
        describe('Map section tests', () => {
          it('Main info section should contain map section', () => {
            const mainInfoSection = el.querySelector('main .desktop-container');
            expect(mainInfoSection.querySelector('.map-section')).not.toBe(
              null,
            );
          });
          it('Map section should contain header with icon and text', () => {
            const mapSection = el.querySelector(
              '.desktop-container .map-section',
            );
            expect(mapSection.querySelector('.section-header')).not.toBe(null);
            expect(mapSection.querySelector('.section-header i')).not.toBe(
              null,
            );
            expect(mapSection.querySelector('.section-header i')).toHaveClass(
              'fas',
              'fa-map-marker-alt',
            );
            expect(mapSection.querySelector('.section-header span')).not.toBe(
              null,
            );
            expect(
              mapSection.querySelector('.section-header span').innerText,
            ).toContain('Location Map');
          });
          it('Map section should should contain map card', () => {
            const mapSection = el.querySelector(
              '.desktop-container .map-section',
            );
            expect(mapSection.querySelector('.map-container')).not.toBe(null);
          });
          it('Map card should contain empty map card with icon and text', () => {
            const mapCard = el.querySelector('.map-section .map-container');
            expect(mapCard.querySelector('i')).not.toBe(null);
            expect(mapCard.querySelector('i')).toHaveClass('fas', 'fa-map');
            expect(mapCard.querySelector('p')).not.toBe(null);
            expect(mapCard.querySelector('p').innerText).toContain(
              'Search for a city to display its map',
            );
          });
          it('drawMap should disable empty state and add weather img', () => {
            const url = 'test-url';
            const mapContainer = el.querySelector(
              '.map-section .map-container',
            );
            const emptyMap = mapContainer.querySelector('.state-container');
            drawMap(url);
            expect(emptyMap).toHaveClass('hidden');
            expect(mapContainer.querySelector('#map')).not.toBeNull();
            expect(mapContainer.querySelector('#map img')).toHaveAttribute(
              'src',
              'test-url',
            );
          });
          it('drawMap() should delete previously existing map images', () => {
            const mapContainer = el.querySelector(
              '.map-section .map-container',
            );
            drawMap('test-url-1');
            expect(mapContainer.querySelectorAll('#map').length).toBe(1);
            expect(mapContainer.querySelector('#map img')).toHaveAttribute(
              'src',
              'test-url-1',
            );
            drawMap('test-url-2');
            expect(mapContainer.querySelectorAll('#map').length).toBe(1);
            expect(mapContainer.querySelector('#map img')).toHaveAttribute(
              'src',
              'test-url-2',
            );
          });
        });
        describe('Sidebar tests', () => {
          it('Main info section should contain sidebar', () => {
            const mainInfoSection = el.querySelector('main .desktop-container');
            expect(mainInfoSection.querySelector('.sidebar')).not.toBe(null);
          });
          describe('History section tests', () => {
            it('Sidebar should contain history section', () => {
              const sidebar = el.querySelector('.desktop-container .sidebar');
              expect(sidebar.querySelector('.history-section')).not.toBe(null);
            });
            it('History section should contain history card', () => {
              const historySection = el.querySelector('.history-section');
              expect(historySection.querySelector('.card')).not.toBeNull();
            });
            it('History section should contain results', () => {
              const historySection = el.querySelector('.history-section');
              expect(
                historySection.querySelector('.history-container'),
              ).not.toBeNull();
            });
            it('History card should container header with text and icon', () => {
              const historyCard = el.querySelector('.history-section .card');
              const historyCardHeader =
                historyCard.querySelector('.section-header');
              expect(historyCardHeader).not.toBeNull();
              expect(historyCardHeader.querySelector('i')).not.toBeNull();
              expect(historyCardHeader.querySelector('i')).toHaveClass(
                'fas',
                'fa-history',
              );
              expect(historyCardHeader.querySelector('span')).not.toBeNull();
              expect(
                historyCardHeader.querySelector('span').innerText,
              ).toContain('Search History');
            });
            it('History section should contain history list with empty card', () => {
              const historyList = el.querySelector('.history-list');
              const emptyHistory =
                historyList.querySelector('.state-container');
              expect(historyList).not.toBeNull();
              expect(emptyHistory).not.toBeNull();
              expect(emptyHistory.querySelector('i')).not.toBeNull();
              expect(emptyHistory.querySelector('i')).toHaveClass(
                'fas',
                'fa-search',
              );
              expect(emptyHistory.querySelector('p')).not.toBeNull();
              expect(emptyHistory.querySelector('p').innerText).toContain(
                'Your search history will appear here',
              );
            });
            it('History section should contain history actions with clear history button', () => {
              const historyActions = el.querySelector('.history-actions');
              const clearHistoryButton =
                historyActions.querySelector('.btn-secondary');
              expect(historyActions).not.toBeNull();
              expect(clearHistoryButton).not.toBeNull();
              expect(clearHistoryButton.querySelector('i')).not.toBeNull();
              expect(clearHistoryButton.querySelector('i')).toHaveClass(
                'fas',
                'fa-trash-alt',
              );
              expect(clearHistoryButton.querySelector('span')).not.toBeNull();
              expect(
                clearHistoryButton.querySelector('span').innerText,
              ).toContain('Clear History');
            });
          });
        });
      });
    });
  });
  describe('Weather info creation tests', () => {
    let weatherDataObject;
    let weatherData;
    beforeEach(() => {
      weatherDataObject = {
        name: 'TestName',
        weather: [
          {
            icon: '28n',
            description: 'Hells Fire',
          },
        ],
        main: {
          temp: 666,
          humidity: 500,
          pressure: 1313,
        },
        wind: {
          speed: 13,
        },
        time: '15:59',
        date: 'Jan 15, 1516',
        cityName: 'TestName',
        searchTime: '15:59',
        searchDate: 'Sunday, January 01, 0000',
      };
      weatherData = el.querySelector('#weatherData');
      drawWeather(weatherDataObject);
    });
    it('Weather card should not contain emptyWeather', () => {
      const weatherCard = el.querySelector('.weather-section .card');
      const emptyWeatherContainer =
        weatherCard.querySelector('.state-container');
      expect(emptyWeatherContainer).toHaveClass('hidden');
    });
    it('Weather data should be visible', () => {
      expect(weatherData).not.toHaveClass('hidden');
    });
    it('Weather data should contain header', () => {
      expect(weatherData.querySelector('.weather-header')).not.toBeNull();
    });
    it('Weather header should contain city name', () => {
      expect(
        weatherData.querySelector('.weather-header p').innerText,
      ).toContain('Sunday, January 01, 0000');
    });
    it('Weather header should contain last update time', () => {
      expect(weatherData.querySelector('.last-updated')).not.toBeNull();
      expect(weatherData.querySelector('.last-updated i')).not.toBeNull();
      expect(weatherData.querySelector('.last-updated i')).toHaveClass(
        'fas',
        'fa-history',
      );
      expect(weatherData.querySelector('.last-updated span')).not.toBeNull();
      expect(
        weatherData.querySelector('.last-updated span').innerText,
      ).toContain('15:59');
    });
    it('Weather info should contain icon', () => {
      expect(weatherData.querySelector('.weather-icon')).not.toBeNull();
      expect(weatherData.querySelector('.weather-icon img').src).toContain(
        '28n',
      );
    });
    it('Weather temperature should be visible', () => {
      expect(weatherData.querySelector('.temperature')).not.toBeNull();
      expect(weatherData.querySelector('.temperature').innerText).toContain(
        '666°C',
      );
    });
    it('Weather description should be visible', () => {
      expect(weatherData.querySelector('.weather-description')).not.toBeNull();
      expect(
        weatherData.querySelector('.weather-description').innerText,
      ).toContain('Hells Fire');
    });
    it('Wind data should be visible', () => {
      expect(weatherData.querySelector('.wind-details')).not.toBeNull();
      expect(weatherData.querySelector('.wind-value').innerText).toContain(
        '13 m/s',
      );
    });
    it('Humidity details should should be visible', () => {
      expect(weatherData.querySelector('.humidity-details')).not.toBeNull();
      expect(weatherData.querySelector('.humidity-value').innerText).toContain(
        '500',
      );
    });
    it('Pressure details should be visible', () => {
      expect(weatherData.querySelector('.pressure-details')).not.toBeNull();
      expect(weatherData.querySelector('.pressure-value').innerText).toContain(
        '1313',
      );
    });
  });
  describe('History creation tests', () => {
    let cityNames;
    let historyList;
    beforeEach(() => {
      cityNames = ['London', 'Paris', 'Moscow'];
      drawHistory(cityNames);
      historyList = el.querySelector('.history-list');
    });
    it('Empty history should be hidden', () => {
      expect(historyList.querySelector('.state-container')).toHaveClass(
        'hidden',
      );
    });
    it('Clear History button should be enabled', () => {
      expect(el.querySelector('.history-actions button')).toBeEnabled();
    });
    it('Number of drawn items should be 3', () => {
      expect(historyList.querySelectorAll('.history-item').length).toEqual(3);
    });
    it('Number of drawn items should not be more than 10', () => {
      drawHistory([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      expect(historyList.querySelectorAll('.history-item').length).toEqual(10);
    });
    it('History item should have city name and icon', () => {
      drawHistory(['Moscow']);
      expect(historyList.querySelector('h3')).not.toBeNull();
      expect(historyList.querySelector('h3').innerText).toContain('Moscow');
      expect(historyList.querySelector('i')).not.toBeNull();
      expect(historyList.querySelector('i')).toHaveClass(
        'fas',
        'fa-map-marker-alt',
      );
    });
    it('clearVisibleHistory() should remove all history items and disable button', () => {
      clearVisibleHistory();
      expect(historyList.querySelectorAll('.history-item').length).toEqual(0);
      expect(el.querySelector('.history-actions button')).toBeDisabled();
    });
    it('getVisibleHistoryItems() should return list of city names', () => {
      const cityList = getVisibleHistoryItems();
      expect(cityList.length).toEqual(3);
      expect(cityList).toEqual(['Moscow', 'Paris', 'London']);
    });
  });
  describe('Elements modification tests', () => {
    let searchInput;
    let searchButton;
    beforeEach(() => {
      searchInput = el.querySelector('#cityInput');
      searchButton = el.querySelector('#searchButton');
    });
    it('Adding text to input should enable search button', () => {
      searchInput.value = 'Test';
      enableSearchButton(searchInput, searchButton);
      expect(searchButton).toBeEnabled();
    });
    it('clearSearchInput() should clear Input disable Search Button', () => {
      searchInput.value = 'Test';
      enableSearchButton(searchInput, searchButton);
      expect(searchButton).toBeEnabled();

      clearSearchInput(searchInput, searchButton);

      expect(searchButton).toBeDisabled();
      expect(searchInput.value).toEqual('');
    });
  });
});
