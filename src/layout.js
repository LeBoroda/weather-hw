export function runLayout(wrapperElement) {
  const header = document.createElement('header');
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container', 'header-container');
  const headerTitle = document.createElement('h1');
  const headerIcon = document.createElement('i');
  headerIcon.classList.add('fas', 'fa-cloud-sun');
  const textWrapper = document.createElement('span');
  textWrapper.innerText = 'Weather Forecast';
  headerTitle.append(headerIcon, textWrapper);
  headerContainer.appendChild(headerTitle);
  header.appendChild(headerContainer);

  const main = document.createElement('main');
  main.classList.add('container');
  const searchSection = document.createElement('section');
  searchSection.classList.add('search-section');
  const searchCard = document.createElement('div');
  searchCard.classList.add('card');
  searchSection.appendChild(searchCard);
  const searchCardHeader = document.createElement('h2');
  searchCardHeader.innerText = 'Search for a city';
  const searchForm = document.createElement('form');
  searchForm.id = 'cityForm';
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-wrapper');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'cityInput';
  searchInput.placeholder = 'Enter city name';
  searchInput.setAttribute('aria-label', 'City name');
  const clearInputButton = document.createElement('button');
  clearInputButton.type = 'button';
  clearInputButton.id = 'clearButton';
  clearInputButton.classList.add('clear-button');
  clearInputButton.setAttribute('aria-label', 'Clear input');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-times-circle');
  clearInputButton.appendChild(icon);
  inputWrapper.append(searchInput, clearInputButton);
  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  searchButton.type = 'submit';
  searchButton.classList.add('btn-primary');
  searchButton.disabled = true;
  searchButton.innerText = 'Search';
  searchForm.append(inputWrapper, searchButton);
  searchCard.append(searchCardHeader, searchForm);
  main.appendChild(searchSection);
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('desktop-container');
  desktopContainer.innerHTML = ` <!-- Main content - Weather and Map -->
          <div class="main-content">
            <!-- Weather Display -->
            <section class="weather-section">
              <div class="card">
                <!-- Empty state - shown initially -->
                <div class="state-container">
                  <div class="state-icon">
                    <i class="fas fa-cloud-sun"></i>
                  </div>
                  <h3>No weather data to display</h3>
                  <p>Search for a city to see the current weather</p>
                </div>

                <!-- Weather data container - hidden initially -->
                <div id="weatherData" class="hidden">
                  <!-- This section is hidden in blank state -->
                </div>
              </div>
            </section>

            <!-- Map Display -->
            <section class="map-section">
              <div class="card">
                <div class="section-header">
                  <h2>
                    <i class="fas fa-map-marker-alt"></i>
                    Location Map
                  </h2>
                </div>
                <div class="map-container">
                  <!-- Map empty state -->
                  <div class="state-container">
                    <i class="fas fa-map"></i>
                    <p>Search for a city to display its map</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar - Search History -->
          <div class="sidebar">
            <!-- Search History -->
            <section class="history-section">
              <div class="card">
                <div class="section-header">
                  <h2>
                    <i class="fas fa-history"></i>
                    Search History
                  </h2>
                </div>

                <div class="history-container">
                  <div class="history-list">
                    <!-- Empty history state -->
                    <div class="state-container">
                      <i class="fas fa-search"></i>
                      <p>Your search history will appear here</p>
                    </div>
                  </div>

                  <div class="history-actions">
                    <button class="btn-secondary" disabled>
                      <i class="fas fa-trash-alt"></i>
                      Clear History
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>`;
  main.appendChild(desktopContainer);

  const footer = document.createElement('footer');
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('container');
  const copyright = document.createElement('p');
  copyright.innerText = `Weather Forecast App \u00A9 ${new Date().getFullYear()}`;
  const sources = document.createElement('p');
  sources.innerText = 'Weather data provided by OpenWeatherMap';
  footerContainer.append(copyright, sources);
  footer.appendChild(footerContainer);
  wrapperElement.append(header, main, footer);
}
