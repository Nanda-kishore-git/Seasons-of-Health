/**
 * Weather module for fetching and displaying current weather data
 * Integrates with OpenWeatherMap API and language system
 */

class WeatherManager {
    constructor() {
        this.apiKey = 'fa163972c04cfaaa3d8320a61084f6d8'; // OpenWeatherMap API key
        this.weatherData = null;
        this.forecastData = null;
        this.fallbackLocation = {
            name: 'Gudali, Vidyanagar, Kota, Chittoor District, AP',
            lat: 13.5856, // Approximate coordinates for Gudali, Vidyanagar area
            lon: 79.4192
        };
        this.fallbackData = {
            temperature: 28,
            humidity: 65,
            description: 'Warm and humid',
            icon: '01d',
            city: 'Gudali, Vidyanagar',
            country: 'India'
        };
        this.currentLocation = null;
        this.locationSource = 'default'; // 'geolocation', 'manual', or 'default'
        this.init();
    }

    /**
     * Get translated text based on current language
     */
    translate(key) {
        if (!languageManager) return key;
        return languageManager.getTranslation(key);
    }

    /**
     * Initialize weather manager
     */
    async init() {
<<<<<<< HEAD
        // Listen for language change events
        window.addEventListener('languageChanged', (e) => {
            this.handleLanguageChange(e.detail.language);
        });

=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        // Get user's location and fetch weather
        await this.getLocationAndWeather();

        // Update weather display
        this.updateWeatherDisplay();
    }

    /**
<<<<<<< HEAD
     * Handle language change event
     */
    handleLanguageChange(newLanguage) {
        // Update weather display with new language
        this.updateWeatherDisplay();
    }

    /**
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
     * Get user location and fetch weather data with fallback options
     */
    async getLocationAndWeather() {
        try {
            // Try to get user's geolocation first
            const position = await this.getCurrentPosition();
            this.currentLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
            this.locationSource = 'geolocation';
            console.log('Using geolocation coordinates:', this.currentLocation);

            // Fetch weather data
            await this.fetchWeatherData(this.currentLocation.lat, this.currentLocation.lon);
        } catch (error) {
            console.error('Geolocation failed, trying manual location:', error);

            // Try manual location from localStorage
            const manualLocation = this.getManualLocation();
            if (manualLocation) {
                this.currentLocation = manualLocation;
                this.locationSource = 'manual';
                console.log('Using manual location:', this.currentLocation);
                await this.fetchWeatherData(this.currentLocation.lat, this.currentLocation.lon);
            } else {
                // Use default fallback location
                this.currentLocation = {
                    lat: this.fallbackLocation.lat,
                    lon: this.fallbackLocation.lon
                };
                this.locationSource = 'default';
                console.log('Using default location:', this.fallbackLocation.name);
                this.weatherData = { ...this.fallbackData };
            }
        }
    }

    /**
     * Get manual location from localStorage
     */
    getManualLocation() {
        try {
            const stored = localStorage.getItem('manualLocation');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error reading manual location:', error);
            return null;
        }
    }

    /**
     * Set manual location
     */
    setManualLocation(location) {
        try {
            localStorage.setItem('manualLocation', JSON.stringify(location));
            this.currentLocation = location;
            this.locationSource = 'manual';
            this.refreshWeather();
        } catch (error) {
            console.error('Error saving manual location:', error);
        }
    }

    /**
     * Get current position using Geolocation API
     */
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }

    /**
     * Fetch weather data from OpenWeatherMap API (current weather + forecast)
     */
    async fetchWeatherData(lat, lon) {
        try {
            // Fetch current weather
            const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
            const currentResponse = await fetch(currentUrl);
            if (!currentResponse.ok) {
                throw new Error(`Current weather API error: ${currentResponse.status}`);
            }
            const currentData = await currentResponse.json();

            // Fetch 24-hour forecast
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) {
                throw new Error(`Forecast API error: ${forecastResponse.status}`);
            }
            const forecastData = await forecastResponse.json();

            // Process current weather
            this.weatherData = {
                temperature: Math.round(currentData.main.temp),
                humidity: currentData.main.humidity,
                description: currentData.weather[0].description,
                icon: currentData.weather[0].icon,
                city: currentData.name,
                country: currentData.sys.country,
                feelsLike: Math.round(currentData.main.feels_like),
                windSpeed: currentData.wind.speed,
                pressure: currentData.main.pressure,
                visibility: currentData.visibility,
                sunrise: new Date(currentData.sys.sunrise * 1000),
                sunset: new Date(currentData.sys.sunset * 1000)
            };

            // Process forecast data (next 24 hours, 3-hour intervals)
            this.forecastData = forecastData.list.slice(0, 8).map(item => ({
                time: new Date(item.dt * 1000),
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                precipitation: item.pop * 100 // Probability of precipitation
            }));

        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Use fallback data
            this.weatherData = { ...this.fallbackData };
            this.forecastData = null;
        }
    }

    /**
     * Update weather display in the UI with enhanced weather card and error handling
     */
    updateWeatherDisplay() {
        try {
            const weatherContainer = document.getElementById('weatherInfo');
            const weatherDesc = document.getElementById('weatherDescription');
            const weatherLocation = document.getElementById('weatherLocation');

            if (!weatherContainer) return;

            // Handle case when weather data is not available
            if (!this.weatherData) {
                weatherContainer.innerHTML = `
                    <div class="weather-item">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span class="weather-temp">--°C</span>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-tint"></i>
                        <span class="weather-humidity">--%</span>
                    </div>
                `;

                if (weatherDesc) {
<<<<<<< HEAD
                    weatherDesc.textContent = this.translate('weather.loading');
                }

                if (weatherLocation) {
                    weatherLocation.textContent = this.translate('weather.location');
=======
                    weatherDesc.textContent = 'Weather data loading...';
                }

                if (weatherLocation) {
                    weatherLocation.textContent = 'Detecting location...';
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
                }
                return;
            }

            const tempUnit = '°C'; // Celsius for all languages in this context
            const weatherIcon = this.getWeatherIcon(this.weatherData.icon);

            weatherContainer.innerHTML = `
                <div class="weather-item">
                    <i class="${weatherIcon}"></i>
                    <span class="weather-temp">${this.weatherData.temperature || '--'}${tempUnit}</span>
                </div>
                <div class="weather-item">
                    <i class="fas fa-tint"></i>
                    <span class="weather-humidity">${this.weatherData.humidity || '--'}%</span>
                </div>
            `;

            // Update weather description if available
            if (weatherDesc) {
<<<<<<< HEAD
                weatherDesc.textContent = this.weatherData.description || this.translate('weather.fallback');
=======
                weatherDesc.textContent = this.weatherData.description || 'Weather information unavailable';
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            }

            // Update location if available
            if (weatherLocation) {
<<<<<<< HEAD
                let locationText = this.translate('weather.location');
                if (this.locationSource === 'default') {
                    locationText = `${this.fallbackLocation.name} (${this.translate('ui.buttons.save')})`; // Using save as approximate for "Default"
                } else if (this.weatherData.city) {
                    locationText = `${this.weatherData.city}${this.weatherData.country ? ', ' + this.weatherData.country : ''}`;
                    if (this.locationSource === 'manual') locationText += ` (${this.translate('ui.menu.home')})`; // Using home as approximate for "Manual"
=======
                let locationText = 'Location unavailable';
                if (this.locationSource === 'default') {
                    locationText = `${this.fallbackLocation.name} (Default)`;
                } else if (this.weatherData.city) {
                    locationText = `${this.weatherData.city}${this.weatherData.country ? ', ' + this.weatherData.country : ''}`;
                    if (this.locationSource === 'manual') locationText += ' (Manual)';
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
                }
                weatherLocation.textContent = locationText;
            }

            // Update forecast display if available
            this.updateForecastDisplay();

        } catch (error) {
            console.error('Error updating weather display:', error);
            // Fallback display
            const weatherContainer = document.getElementById('weatherInfo');
            if (weatherContainer) {
                weatherContainer.innerHTML = `
                    <div class="weather-item">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span class="weather-temp">--°C</span>
                    </div>
                    <div class="weather-item">
                        <i class="fas fa-tint"></i>
                        <span class="weather-humidity">--%</span>
                    </div>
                `;
            }
        }
    }

    /**
<<<<<<< HEAD
     * Update forecast display with enhanced horizontal scrolling
=======
     * Update forecast display
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
     */
    updateForecastDisplay() {
        const forecastContainer = document.getElementById('weatherForecast');
        if (!forecastContainer || !this.forecastData) return;

<<<<<<< HEAD
        // Get local timezone
        const localTime = this.getLocalTime(13.5856, 79.4192); // Gudali coordinates

        const forecastItemsHTML = this.forecastData.slice(0, 8).map(item => {
            const time = item.time.toLocaleTimeString(navigator.language || undefined, {
=======
        const forecastHTML = this.forecastData.slice(0, 6).map(item => {
            const time = item.time.toLocaleTimeString('en-US', {
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            const icon = this.getWeatherIcon(item.icon);
            return `
                <div class="forecast-item">
                    <div class="forecast-time">${time}</div>
                    <i class="${icon}"></i>
                    <div class="forecast-temp">${item.temperature}°C</div>
                    <div class="forecast-desc">${item.description}</div>
                </div>
            `;
        }).join('');

<<<<<<< HEAD
        forecastContainer.innerHTML = forecastItemsHTML;

        // Add navigation functionality
        this.setupForecastNavigation();
    }

    /**
     * Setup forecast navigation buttons
     */
    setupForecastNavigation() {
        const prevBtn = document.getElementById('forecastPrevBtn');
        const nextBtn = document.getElementById('forecastNextBtn');
        const forecastContainer = document.getElementById('weatherForecast');

        if (!prevBtn || !nextBtn || !forecastContainer) return;

        const scrollContainer = forecastContainer.querySelector('.weather-forecast') || forecastContainer;
        const cardWidth = 140; // Approximate card width with margin

        // Update button states based on scroll position
        const updateButtonStates = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

            prevBtn.disabled = scrollLeft <= 0;
            nextBtn.disabled = scrollLeft >= maxScrollLeft - 5; // Small tolerance
        };

        // Previous button click
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -cardWidth * 2,
                behavior: 'smooth'
            });
        });

        // Next button click
        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: cardWidth * 2,
                behavior: 'smooth'
            });
        });

        // Update button states on scroll
        scrollContainer.addEventListener('scroll', updateButtonStates);

        // Initial state update
        updateButtonStates();
=======
        forecastContainer.innerHTML = forecastHTML;
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    /**
     * Get FontAwesome icon class for weather condition
     */
    getWeatherIcon(iconCode) {
        const iconMap = {
            '01d': 'fas fa-sun', // clear sky day
            '01n': 'fas fa-moon', // clear sky night
            '02d': 'fas fa-cloud-sun', // few clouds day
            '02n': 'fas fa-cloud-moon', // few clouds night
            '03d': 'fas fa-cloud', // scattered clouds
            '03n': 'fas fa-cloud',
            '04d': 'fas fa-cloud', // broken clouds
            '04n': 'fas fa-cloud',
            '09d': 'fas fa-cloud-showers-heavy', // shower rain
            '09n': 'fas fa-cloud-showers-heavy',
            '10d': 'fas fa-cloud-rain', // rain day
            '10n': 'fas fa-cloud-rain',
            '11d': 'fas fa-bolt', // thunderstorm
            '11n': 'fas fa-bolt',
            '13d': 'fas fa-snowflake', // snow
            '13n': 'fas fa-snowflake',
            '50d': 'fas fa-smog', // mist
            '50n': 'fas fa-smog'
        };

        return iconMap[iconCode] || 'fas fa-question';
    }

    /**
     * Refresh weather data
     */
    async refreshWeather() {
        if (this.currentLocation) {
            await this.fetchWeatherData(this.currentLocation.lat, this.currentLocation.lon);
            this.updateWeatherDisplay();
        } else {
            await this.getLocationAndWeather();
        }
    }

    /**
     * Get current weather data
     */
    getWeatherData() {
        return this.weatherData;
    }

    /**
     * Get forecast data
     */
    getForecastData() {
        return this.forecastData;
    }

    /**
     * Get current location
     */
    getCurrentLocation() {
        return {
            ...this.currentLocation,
            source: this.locationSource
        };
    }

    /**
     * Calculate local time based on coordinates (timezone offset)
     */
    getLocalTime(lat, lon) {
        // This is a simplified implementation - in production, use a proper timezone API
        // For now, assume IST (+5:30) for Indian locations
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ist = new Date(utc + (5.5 * 3600000)); // IST is UTC+5:30
        return ist;
    }

    /**
     * Show location settings modal
     */
    showLocationSettings() {
        // Create a modal for location settings
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        modal.innerHTML = `
            <div class="location-modal-content">
                <h3>Location Settings</h3>
                <div class="location-option">
                    <strong>Current Location:</strong>
                    <span id="currentLocationDisplay">${this.getLocationDisplay()}</span>
                </div>
                <div class="location-option">
                    <label for="manualLocation">Manual Location:</label>
                    <input type="text" id="manualLocationInput" placeholder="Enter city name" />
                    <button onclick="weatherManager.searchLocation()">Search</button>
                </div>
                <div class="location-option">
                    <button onclick="weatherManager.requestGeolocation()">Use Current Location</button>
                </div>
                <button onclick="this.closest('.location-modal').remove()">Close</button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    /**
     * Get display text for current location
     */
    getLocationDisplay() {
        if (this.locationSource === 'geolocation' && this.weatherData?.city) {
            return `${this.weatherData.city} (GPS)`;
        } else if (this.locationSource === 'manual' && this.weatherData?.city) {
            return `${this.weatherData.city} (Manual)`;
        } else {
            return `${this.fallbackLocation.name} (Default)`;
        }
    }

    /**
     * Request geolocation permission and update location
     */
    async requestGeolocation() {
        try {
            const position = await this.getCurrentPosition();
            this.setManualLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            alert('Location updated successfully!');
        } catch (error) {
            alert('Unable to get your location. Please check your browser permissions.');
        }
    }

    /**
     * Search for location by city name
     */
    async searchLocation() {
        const input = document.getElementById('manualLocationInput');
        if (!input || !input.value.trim()) {
            alert('Please enter a city name');
            return;
        }

        try {
            const city = input.value.trim();
            const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${this.apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const location = {
                    lat: data[0].lat,
                    lon: data[0].lon,
                    name: data[0].name,
                    country: data[0].country
                };
                this.setManualLocation(location);
                alert(`Location set to ${location.name}, ${location.country}`);
            } else {
                alert('City not found. Please try a different name.');
            }
        } catch (error) {
            console.error('Location search error:', error);
            alert('Error searching for location. Please try again.');
        }
    }
}

// Create global instance
const weatherManager = new WeatherManager();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherManager;
}