/**
 * Language module for handling bilingual switching between English and Telugu
 * Handles loading translations, setting language preferences, and updating UI elements
 */

class LanguageManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.init();
    }

    /**
     * Initialize the language manager
     */
    async init() {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('language') || 'en';
        await this.setLanguage(savedLanguage);

        // Set up language selector event listener
<<<<<<< HEAD
        this.setupLanguageSelector();
    }

    /**
     * Set up the language selector event listener
     * Can be called multiple times safely
     */
    setupLanguageSelector() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect && !languageSelect.hasAttribute('data-listener-attached')) {
=======
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
<<<<<<< HEAD
            languageSelect.setAttribute('data-listener-attached', 'true');
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        }
    }

    /**
     * Load translation files for a specific language
     * @param {string} language - Language code ('en' or 'te')
     */
    async loadTranslations(language) {
        try {
            const response = await fetch(`../translations/${language}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${language}`);
            }
            this.translations[language] = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to English if Telugu fails to load
            if (language === 'te' && !this.translations['en']) {
                await this.loadTranslations('en');
            }
        }
    }

    /**
     * Set the current language and update the UI
     * @param {string} language - Language code ('en' or 'te')
     */
    async setLanguage(language) {
        if (this.currentLanguage === language && this.translations[language]) {
            this.updateUI();
            return;
        }

        // Load translations if not already loaded
        if (!this.translations[language]) {
            await this.loadTranslations(language);
        }

        this.currentLanguage = language;

        // Save language preference
        localStorage.setItem('language', language);

        // Update document language attribute
        document.documentElement.lang = language;

        this.updateUI();
<<<<<<< HEAD

        // Trigger language change event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    /**
     * Update all UI elements with translation keys
     */
    updateUI() {
        const currentTranslations = this.translations[this.currentLanguage];
        if (!currentTranslations) return;

        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For input elements, only update if they haven't been modified by user
                    if (!element.dataset.userModified) {
                        element.placeholder = translation;
                    }
<<<<<<< HEAD
                } else if (element.tagName === 'META' && element.getAttribute('name') === 'title') {
                    // Update page title
                    document.title = translation;
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update language selector label
        const languageLabel = document.querySelector('.language-selector label');
        if (languageLabel) {
            languageLabel.textContent = this.getTranslation('ui.greetings.welcome');
        }
<<<<<<< HEAD

        // Update page title
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            document.title = this.getTranslation(titleElement.getAttribute('data-i18n'));
        }

        // Trigger update for dynamic content (chat messages, quiz, etc.)
        this.updateDynamicContent();

        // Update weather widget if present
        this.updateWeatherWidget();

        // Update quiz content if in quiz mode
        this.updateQuizContent();

        // Update disease cards if present
        this.updateDiseaseCards();

        // Update health centers if present
        this.updateHealthCenters();
    }

    /**
     * Update dynamic content that may not have data-i18n attributes
     */
    updateDynamicContent() {
        // Update chat input placeholder
        const chatInput = document.getElementById('chatInput');
        if (chatInput && !chatInput.dataset.userModified) {
            chatInput.placeholder = this.getTranslation('ui.placeholders.message');
        }

        // Update mode toggle buttons
        const chatModeBtn = document.getElementById('chatModeBtn');
        const quizModeBtn = document.getElementById('quizModeBtn');
        if (chatModeBtn) chatModeBtn.innerHTML = '💬 ' + this.getTranslation('assistant.title').split(' ')[1]; // Extract "Assistant"
        if (quizModeBtn) quizModeBtn.innerHTML = '📝 ' + this.getTranslation('quiz.title');

        // Update floating mic button title
        const floatingMicBtn = document.getElementById('floatingMicBtn');
        if (floatingMicBtn) {
            floatingMicBtn.title = this.getTranslation('assistant.prompts.greeting').split('!')[0] + ' Speech-to-Text'; // Simple title
        }
    }

    /**
     * Update weather widget text
     */
    updateWeatherWidget() {
        const weatherHeader = document.querySelector('.weather-header');
        if (weatherHeader) {
            weatherHeader.textContent = this.getTranslation('weather.current');
        }

        const weatherLocation = document.querySelector('.weather-location');
        if (weatherLocation && weatherLocation.textContent.includes('--')) {
            weatherLocation.textContent = this.getTranslation('weather.location');
        }
    }

    /**
     * Update quiz content dynamically
     */
    updateQuizContent() {
        // Update quiz header
        const quizHeader = document.querySelector('.quiz-header h2');
        if (quizHeader) {
            quizHeader.textContent = this.getTranslation('quiz.title');
        }

        const quizDesc = document.querySelector('.quiz-header p');
        if (quizDesc) {
            quizDesc.textContent = this.getTranslation('quiz.description');
        }

        // Update quiz navigation buttons
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        if (prevBtn) prevBtn.innerHTML = `<i class="fas fa-arrow-left"></i> ${this.getTranslation('ui.buttons.previous')}`;
        if (nextBtn && !nextBtn.innerHTML.includes('Get Results')) {
            nextBtn.innerHTML = `${this.getTranslation('quiz.buttons.next')} <i class="fas fa-arrow-right"></i>`;
        }

        // Update quiz questions if they exist
        const quizQuestions = document.querySelectorAll('.quiz-question h3');
        quizQuestions.forEach(question => {
            const questionText = question.textContent;
            // Try to find the translation key from the question text
            for (const [key, value] of Object.entries(this.translations[this.currentLanguage].quiz?.questions || {})) {
                if (value === questionText || questionText.toLowerCase().includes(value.toLowerCase())) {
                    question.textContent = value;
                    break;
                }
            }
        });

        // Update quiz options
        const quizOptions = document.querySelectorAll('.quiz-option');
        quizOptions.forEach(option => {
            const optionText = option.textContent.trim();
            if (optionText === 'Yes' || optionText === 'సమ్మతి') {
                option.textContent = this.getTranslation('ui.buttons.submit'); // Yes
            } else if (optionText === 'No' || optionText === 'వద్దు') {
                option.textContent = this.getTranslation('ui.buttons.cancel'); // No
            }
        });
    }

    /**
     * Update disease cards with current language
     */
    updateDiseaseCards() {
        const diseaseCards = document.querySelectorAll('.disease-card');
        diseaseCards.forEach(card => {
            const cardData = card.dataset.diseaseData;
            if (cardData) {
                try {
                    const diseaseData = JSON.parse(cardData);
                    const langData = diseaseData[this.currentLanguage] || diseaseData.en;

                    // Update card title
                    const titleElement = card.querySelector('h3');
                    if (titleElement) {
                        titleElement.textContent = langData.name || diseaseData.en.name;
                    }

                    // Update all disease information fields
                    const fields = ['symptoms', 'prevention', 'remedies', 'selfCare', 'nutrition'];
                    fields.forEach(field => {
                        const element = card.querySelector(`.${field.toLowerCase()}`);
                        if (element && langData[field]) {
                            let fieldName = field;
                            if (field === 'selfCare') fieldName = 'Self-care';
                            else if (field === 'remedies') fieldName = this.getTranslation('diseases.commonDiseases.flu.treatments');
                            else fieldName = this.getTranslation(`diseases.commonDiseases.flu.${field === 'symptoms' ? 'symptoms' : field === 'prevention' ? 'prevention' : 'treatments'}`) || field;
                            element.innerHTML = `<strong>${fieldName}:</strong> ${Array.isArray(langData[field]) ? langData[field].join(', ') : langData[field]}`;
                        }
                    });

                } catch (error) {
                    console.error('Error updating disease card:', error);
                }
            }
        });
    }

    /**
     * Update health centers with current language
     */
    updateHealthCenters() {
        // This will be handled by the health centers manager when needed
        if (typeof window.healthCentersManager !== 'undefined') {
            window.healthCentersManager.updateLanguage(this.currentLanguage);
        }
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    /**
     * Get nested translation value by key
     * @param {string} key - Dot-separated key path (e.g., 'ui.menu.home')
     * @returns {string} - Translated text or key if not found
     */
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    }

    /**
     * Get the current language code
     * @returns {string} - Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Check if translations are loaded for a language
     * @param {string} language - Language code
     * @returns {boolean} - True if translations are loaded
     */
    isLoaded(language) {
        return !!this.translations[language];
    }
}

// Create global instance
const languageManager = new LanguageManager();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}