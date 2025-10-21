/**
 * Health Centers Map and Management
 * Integrates Leaflet.js for interactive mapping, health centers data, and distance calculations
 */

class HealthCentersManager {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.centerMarkers = [];
        this.healthCenters = [];
        this.currentLocation = null;
        this.selectedCategory = 'hospitals';
<<<<<<< HEAD
        this.closestCenter = null;
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
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
     * Initialize health centers manager
     */
    async init() {
        // Initialize health centers data
        this.loadHealthCentersData();

        // Initialize map
        this.initMap();

        // Get user's location
        await this.getUserLocation();

        // Update UI
        this.updateCentersList();
        this.updateMapMarkers();

        // Initialize fullscreen button
        this.initFullscreenButton();
    }

    /**
     * Load predefined health centers data
     */
    loadHealthCentersData() {
        // Predefined health centers in Gudali, Vidyanagar, Kota area (Andhra Pradesh region)
        this.healthCenters = [
            {
                id: 1,
                name: "Gudali Primary Health Center",
                nameTe: "గుడాలి ప్రాథమిక ఆరోగ్య కేంద్రం",
                category: "hospitals",
                lat: 13.5836,
                lon: 79.4192,
                address: "Gudali Main Road, Gudali, Vidyanagar",
                addressTe: "గుడాలి మెయిన్ రోడ్, గుడాలి, విద్యానగర్",
                phone: "+91-9876543210",
                hours: "24/7",
                services: ["Emergency Care", "General Medicine", "Maternity Care"],
                servicesTe: ["అత్యవసర సంరక్షణ", "సాధారణ వైద్యం", "మాతృత్వ సంరక్షణ"]
            },
            {
                id: 2,
                name: "Vidyanagar Medical Clinic",
                nameTe: "విద్యానగర్ వైద్య క్లినిక్",
                category: "clinics",
                lat: 13.5856,
                lon: 79.4172,
                address: "Near Bus Stand, Vidyanagar, Kota",
                addressTe: "బస్ స్టాండ్ సమీపంలో, విద్యానగర్, కోట",
                phone: "+91-9876543211",
                hours: "Mon-Sat 9AM-8PM",
                services: ["Primary Care", "Vaccinations", "Health Checkups"],
                servicesTe: ["ప్రాథమిక సంరక్షణ", "టీకాలు", "ఆరోగ్య తనిఖీలు"]
            },
            {
                id: 3,
                name: "Apollo Pharmacy Gudali",
                nameTe: "అపోలో ఫార్మసీ గుడాలి",
                category: "pharmacies",
                lat: 13.5826,
                lon: 79.4212,
                address: "Main Market, Gudali",
                addressTe: "మెయిన్ మార్కెట్, గుడాలి",
                phone: "+91-9876543212",
                hours: "Mon-Sun 8AM-10PM",
                services: ["Medicines", "Health Products", "Consultation"],
                servicesTe: ["మందులు", "ఆరోగ్య ఉత్పత్తులు", "సలహా"]
            },
            {
                id: 4,
                name: "Kota District Hospital",
                nameTe: "కోట జిల్లా ఆసుపత్రి",
                category: "hospitals",
                lat: 13.5806,
                lon: 79.4152,
                address: "Hospital Road, Kota",
                addressTe: "ఆసుపత్రి రోడ్, కోట",
                phone: "+91-9876543213",
                hours: "24/7",
                services: ["Emergency", "Surgery", "Specialized Care"],
                servicesTe: ["అత్యవసరం", "శస్త్ర చికిత్స", "ప్రత్యేక సంరక్షణ"]
            },
            {
                id: 5,
                name: "Chittoor Emergency Services",
                nameTe: "చిత్తూర్ అత్యవసర సేవలు",
                category: "emergency",
                lat: 13.5886,
                lon: 79.4232,
                address: "Emergency Center, Gudali",
                addressTe: "అత్యవసర కేంద్రం, గుడాలి",
                phone: "108",
                hours: "24/7",
                services: ["Emergency Response", "Ambulance", "First Aid"],
                servicesTe: ["అత్యవసర ప్రతిస్పందన", "అంబులెన్స్", "మొదటి సహాయం"]
            }
        ];
    }

    /**
     * Initialize Leaflet map
     */
    initMap() {
        // Default center (Gudali, Vidyanagar, Kota area)
        const defaultCenter = [13.5856, 79.4192];

        this.map = L.map('healthCentersMap').setView(defaultCenter, 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(this.map);

        // Add scale control
        L.control.scale().addTo(this.map);
    }

    /**
     * Get user's current location
     */
    async getUserLocation() {
        try {
            const position = await weatherManager.getCurrentPosition();
            this.currentLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };

            // Center map on user's location
            this.map.setView([this.currentLocation.lat, this.currentLocation.lon], 14);

            // Add user marker
            this.addUserMarker();

<<<<<<< HEAD
            // Find and highlight closest health center
            this.findClosestCenter();

=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        } catch (error) {
            console.error('Error getting user location:', error);
            // Use weather manager's location as fallback
            const weatherLoc = weatherManager.getCurrentLocation();
            if (weatherLoc) {
                this.currentLocation = weatherLoc;
                this.addUserMarker();
<<<<<<< HEAD
                this.findClosestCenter();
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            } else {
                // Use default location
                this.currentLocation = {
                    lat: weatherManager.fallbackLocation.lat,
                    lon: weatherManager.fallbackLocation.lon
                };
<<<<<<< HEAD
                this.findClosestCenter();
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            }
        }
    }

    /**
     * Add user location marker
     */
    addUserMarker() {
        if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
        }

        const userIcon = L.divIcon({
            html: '<i class="fas fa-user" style="color: #2196F3; font-size: 20px;"></i>',
            className: 'user-location-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        this.userMarker = L.marker([this.currentLocation.lat, this.currentLocation.lon], {
            icon: userIcon
        })
        .addTo(this.map)
        .bindPopup('<strong>Your Location</strong><br>Current position');
    }

    /**
     * Filter centers by category
     */
    filterCentersByCategory(category) {
        this.selectedCategory = category;
<<<<<<< HEAD
        // Find closest center for new category
        if (this.currentLocation) {
            this.findClosestCenter();
        }
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        this.updateCentersList();
        this.updateMapMarkers();
    }

    /**
     * Update centers list in UI
     */
    updateCentersList() {
        const centerList = document.getElementById('centerList');
        if (!centerList) return;

        // Filter centers by category
        const filteredCenters = this.selectedCategory === 'all' ?
            this.healthCenters :
            this.healthCenters.filter(center => center.category === this.selectedCategory);

        // Sort by distance if user location available
        let sortedCenters = [...filteredCenters];
        if (this.currentLocation) {
            sortedCenters.sort((a, b) => {
                const distA = this.calculateDistance(this.currentLocation, a);
                const distB = this.calculateDistance(this.currentLocation, b);
                return distA - distB;
            });
        }

        centerList.innerHTML = sortedCenters.map(center => this.createCenterCard(center)).join('');
    }

    /**
     * Create center card HTML
     */
    createCenterCard(center) {
        const distance = this.currentLocation ?
            this.calculateDistance(this.currentLocation, center).toFixed(1) : 'N/A';

        const currentLang = languageManager.getCurrentLanguage();
        const name = currentLang === 'te' ? center.nameTe : center.name;
        const address = currentLang === 'te' ? center.addressTe : center.address;
        const services = currentLang === 'te' ? center.servicesTe : center.services;

        return `
            <div class="center-card" onclick="healthCentersManager.centerMapOnCenter(${center.id})">
                <h3>${name}</h3>
                <p><strong data-i18n="healthCenters.info.location">Location:</strong> ${address}</p>
                <p><strong data-i18n="healthCenters.info.contact">Contact:</strong> ${center.phone}</p>
                <p><strong data-i18n="healthCenters.info.distance">Distance:</strong> ${distance} km</p>
                <p><strong data-i18n="healthCenters.info.services">Services:</strong> ${services.join(', ')}</p>
                <p><strong data-i18n="healthCenters.info.hours">Operating Hours:</strong> ${center.hours}</p>
            </div>
        `;
    }

    /**
     * Update map markers
     */
    updateMapMarkers() {
        // Clear existing markers
        this.centerMarkers.forEach(marker => this.map.removeLayer(marker));
        this.centerMarkers = [];

        // Filter centers by category
        const filteredCenters = this.selectedCategory === 'all' ?
            this.healthCenters :
            this.healthCenters.filter(center => center.category === this.selectedCategory);

        // Add markers for filtered centers
        filteredCenters.forEach(center => {
            const marker = this.createCenterMarker(center);
            this.centerMarkers.push(marker);
        });

        // Fit map bounds to show all markers and user location
        if (this.centerMarkers.length > 0) {
            const group = new L.featureGroup(this.centerMarkers.concat(this.userMarker ? [this.userMarker] : []));
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }

    /**
     * Create center marker
     */
    createCenterMarker(center) {
<<<<<<< HEAD
        const isClosest = this.closestCenter && this.closestCenter.id === center.id;
        const iconHtml = isClosest ? this.getClosestIcon(center.category) : this.getCategoryIcon(center.category);
        const markerIcon = L.divIcon({
            html: iconHtml,
            className: isClosest ? 'health-center-marker closest' : 'health-center-marker',
=======
        const iconHtml = this.getCategoryIcon(center.category);
        const markerIcon = L.divIcon({
            html: iconHtml,
            className: 'health-center-marker',
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        const currentLang = languageManager.getCurrentLanguage();
        const name = currentLang === 'te' ? center.nameTe : center.name;
<<<<<<< HEAD
        const address = currentLang === 'te' ? center.addressTe : center.address;
        const services = currentLang === 'te' ? center.servicesTe : center.services;
        const distance = this.currentLocation ?
            this.calculateDistance(this.currentLocation, center).toFixed(1) + ' km' : 'N/A';

        const popupContent = `
            <div class="marker-popup" style="max-width: 250px;">
                <h4 style="margin-bottom: 10px; color: #4CAF50;">${name}</h4>
                <p><strong>🏥 Address:</strong><br>${address}</p>
                <p><strong>📞 Contact:</strong> ${center.phone}</p>
                <p><strong>🛎️ Services:</strong><br>${services.join('<br>')}</p>
                <p><strong>⏰ Hours:</strong> ${center.hours}</p>
                <p><strong>📍 Distance:</strong> ${distance}</p>
                ${isClosest ? '<p style="color: #FFD700; font-weight: bold;">⭐ Closest to you!</p>' : ''}
            </div>
        `;

        const marker = L.marker([center.lat, center.lon], { icon: markerIcon })
            .addTo(this.map)
            .bindPopup(popupContent);

        // Make marker clickable to show detailed info
        marker.on('click', () => {
            this.showDetailedCenterInfo(center);
        });

        return marker;
=======
        const services = currentLang === 'te' ? center.servicesTe : center.services;

        const popupContent = `
            <div class="marker-popup">
                <h4>${name}</h4>
                <p><strong>Contact:</strong> ${center.phone}</p>
                <p><strong>Services:</strong> ${services.join(', ')}</p>
                <p><strong>Hours:</strong> ${center.hours}</p>
            </div>
        `;

        return L.marker([center.lat, center.lon], { icon: markerIcon })
            .addTo(this.map)
            .bindPopup(popupContent);
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    /**
     * Get category icon HTML
     */
    getCategoryIcon(category) {
        const icons = {
            hospitals: '<i class="fas fa-hospital" style="color: #e74c3c;"></i>',
            clinics: '<i class="fas fa-clinic-medical" style="color: #27ae60;"></i>',
            pharmacies: '<i class="fas fa-pills" style="color: #3498db;"></i>',
            emergency: '<i class="fas fa-ambulance" style="color: #e67e22;"></i>'
        };
        return icons[category] || '<i class="fas fa-map-marker-alt" style="color: #95a5a6;"></i>';
    }

    /**
<<<<<<< HEAD
     * Get closest center icon HTML with highlighting
     */
    getClosestIcon(category) {
        const icons = {
            hospitals: '<div class="closest-marker"><i class="fas fa-hospital" style="color: #FFD700;"></i><div class="closest-pulse"></div></div>',
            clinics: '<div class="closest-marker"><i class="fas fa-clinic-medical" style="color: #FFD700;"></i><div class="closest-pulse"></div></div>',
            pharmacies: '<div class="closest-marker"><i class="fas fa-pills" style="color: #FFD700;"></i><div class="closest-pulse"></div></div>',
            emergency: '<div class="closest-marker"><i class="fas fa-ambulance" style="color: #FFD700;"></i><div class="closest-pulse"></div></div>'
        };
        return icons[category] || '<div class="closest-marker"><i class="fas fa-map-marker-alt" style="color: #FFD700;"></i><div class="closest-pulse"></div></div>';
    }

    /**
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
     * Calculate distance between two points (Haversine formula)
     */
    calculateDistance(point1, point2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRadians(point2.lat - point1.lat);
        const dLon = this.toRadians(point2.lon - point1.lon);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    /**
     * Convert degrees to radians
     */
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
<<<<<<< HEAD
     * Find and highlight the closest health center using AI-powered logic
     */
    findClosestCenter() {
        if (!this.currentLocation) return;

        let closest = null;
        let minDistance = Infinity;

        // Filter centers by current category
        const filteredCenters = this.selectedCategory === 'all' ?
            this.healthCenters :
            this.healthCenters.filter(center => center.category === this.selectedCategory);

        // Calculate distances and find closest
        filteredCenters.forEach(center => {
            const distance = this.calculateDistance(this.currentLocation, center);
            if (distance < minDistance) {
                minDistance = distance;
                closest = center;
            }
        });

        // Set closest center and update markers
        this.closestCenter = closest;
        this.updateMapMarkers();

        // AI-powered recommendation: Show notification for closest center
        if (closest) {
            this.showClosestCenterNotification(closest, minDistance);
        }
    }

    /**
     * Show AI-powered notification for closest health center
     */
    showClosestCenterNotification(center, distance) {
        const currentLang = languageManager.getCurrentLanguage();
        const name = currentLang === 'te' ? center.nameTe : center.name;

        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'closest-center-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #333;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 300px;
            font-weight: 600;
            animation: slideInRight 0.5s ease;
            border: 2px solid #FFD700;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <i class="fas fa-star" style="color: #FFD700; margin-right: 8px; font-size: 18px;"></i>
                <strong>AI Recommendation</strong>
            </div>
            <div style="font-size: 14px; line-height: 1.4;">
                <strong>${name}</strong><br>
                📍 ${distance.toFixed(1)} km away<br>
                <small>Click marker for details</small>
            </div>
            <button onclick="this.parentElement.remove()" style="
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                color: #333;
                cursor: pointer;
                font-size: 16px;
            ">×</button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 8000);
    }

    /**
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
     * Center map on specific center
     */
    centerMapOnCenter(centerId) {
        const center = this.healthCenters.find(c => c.id === centerId);
        if (center) {
            this.map.setView([center.lat, center.lon], 16);
            // Find and open the marker popup
            const marker = this.centerMarkers.find(m => {
                const latlng = m.getLatLng();
                return latlng.lat === center.lat && latlng.lng === center.lon;
            });
            if (marker) {
                marker.openPopup();
            }
        }
    }

    /**
<<<<<<< HEAD
     * Show detailed center information in a modal
     */
    showDetailedCenterInfo(center) {
        const currentLang = languageManager.getCurrentLanguage();
        const name = currentLang === 'te' ? center.nameTe : center.name;
        const address = currentLang === 'te' ? center.addressTe : center.address;
        const services = currentLang === 'te' ? center.servicesTe : center.services;
        const distance = this.currentLocation ?
            this.calculateDistance(this.currentLocation, center).toFixed(1) + ' km' : 'N/A';

        // Create modal HTML
        const modalHTML = `
            <div id="centerModal" class="modal-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            ">
                <div class="modal-content" style="
                    background: white;
                    border-radius: 15px;
                    padding: 25px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    animation: slideUp 0.3s ease;
                    position: relative;
                ">
                    <button onclick="this.closest('.modal-overlay').remove()" style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: #e74c3c;
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        font-size: 16px;
                    ">×</button>
                    <h2 style="color: #4CAF50; margin-bottom: 20px; display: flex; align-items: center;">
                        🏥 ${name}
                    </h2>
                    <div style="margin-bottom: 15px;">
                        <strong>📍 Address:</strong><br>
                        <span style="color: #555;">${address}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>📞 Contact:</strong><br>
                        <a href="tel:${center.phone}" style="color: #2196F3; text-decoration: none;">${center.phone}</a>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>🛎️ Services:</strong><br>
                        <ul style="color: #555; padding-left: 20px;">
                            ${services.map(service => `<li>${service}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>⏰ Operating Hours:</strong><br>
                        <span style="color: #555;">${center.hours}</span>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <strong>📏 Distance from you:</strong><br>
                        <span style="color: #e67e22; font-weight: bold;">${distance}</span>
                    </div>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button onclick="healthCentersManager.getDirections(${center.lat}, ${center.lon})" style="
                            background: #4CAF50;
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">🗺️ Get Directions</button>
                        <button onclick="window.open('tel:${center.phone}')" style="
                            background: #2196F3;
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            border-radius: 8px;
                            cursor: pointer;
                            font-weight: 600;
                        ">📞 Call Now</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add click outside to close
        document.getElementById('centerModal').addEventListener('click', (e) => {
            if (e.target.id === 'centerModal') {
                document.getElementById('centerModal').remove();
            }
        });
    }

    /**
     * Get directions to center
     */
    getDirections(lat, lon) {
        if (this.currentLocation) {
            const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${this.currentLocation.lat},${this.currentLocation.lon};${lat},${lon}`;
            window.open(url, '_blank');
        } else {
            alert('User location not available for directions');
        }
    }

    /**
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
     * Show category function (for HTML onclick)
     */
    showCategory(category) {
        // Update button states
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Filter centers
        this.filterCentersByCategory(category);
    }

    /**
     * Initialize fullscreen button functionality
     */
    initFullscreenButton() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('webkitfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('mozfullscreenchange', () => this.handleFullscreenChange());
        document.addEventListener('MSFullscreenChange', () => this.handleFullscreenChange());
    }

    /**
     * Handle fullscreen change events
     */
    handleFullscreenChange() {
        const mapContainer = document.querySelector('.map-container');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const icon = fullscreenBtn ? fullscreenBtn.querySelector('i') : null;

        if (!document.fullscreenElement && !document.webkitFullscreenElement &&
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            // Exited fullscreen
            mapContainer.classList.remove('fullscreen');
            if (icon) icon.className = 'fas fa-expand';
        } else {
            // Entered fullscreen
            mapContainer.classList.add('fullscreen');
            if (icon) icon.className = 'fas fa-compress';
        }

        // Resize map when entering/exiting fullscreen
        if (this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }
    }

    /**
     * Toggle fullscreen mode for the map
     */
    toggleFullscreen() {
        const mapContainer = document.querySelector('.map-container');

        if (!document.fullscreenElement && !document.webkitFullscreenElement &&
            !document.mozFullScreenElement && !document.msFullscreenElement) {
            // Enter fullscreen
            if (mapContainer.requestFullscreen) {
                mapContainer.requestFullscreen();
            } else if (mapContainer.webkitRequestFullscreen) {
                mapContainer.webkitRequestFullscreen();
            } else if (mapContainer.msRequestFullscreen) {
                mapContainer.msRequestFullscreen();
            } else if (mapContainer.mozRequestFullScreen) {
                mapContainer.mozRequestFullScreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
        }
    }
}

// Global function for HTML onclick
function showCategory(category) {
    if (window.healthCentersManager) {
        window.healthCentersManager.showCategory(category);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to load
    setTimeout(() => {
        if (typeof languageManager !== 'undefined' && typeof weatherManager !== 'undefined') {
            window.healthCentersManager = new HealthCentersManager();
        } else {
            console.warn('Required dependencies not loaded. Retrying...');
            setTimeout(() => {
                window.healthCentersManager = new HealthCentersManager();
            }, 1000);
        }
    }, 100);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HealthCentersManager;
}