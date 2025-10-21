/**
 * Voice module for Text-to-Speech functionality using Web Speech API
 * Handles speaking text with appropriate language and voice settings
 */

class VoiceManager {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.currentLanguage = 'en-US';
        this.isSpeaking = false;
        this.currentUtterance = null;

        this.init();
    }

    init() {
        // Listen for language changes from languageManager
        window.addEventListener('languageChanged', (e) => {
            this.updateLanguage(e.detail.language);
        });

        // Set initial language
        if (typeof languageManager !== 'undefined') {
            this.updateLanguage(languageManager.getCurrentLanguage());
        } else {
            // Fallback to language selector if languageManager not available
            const languageSelect = document.getElementById('languageSelect');
            if (languageSelect) {
                this.updateLanguage(languageSelect.value);
                languageSelect.addEventListener('change', (e) => {
                    this.updateLanguage(e.target.value);
                });
            }
        }
    }

    updateLanguage(lang) {
        // Map language codes to speech synthesis languages
        const langMap = {
            'en': 'en-US',
            'te': 'te-IN'
        };
        this.currentLanguage = langMap[lang] || 'en-US';
    }

    /**
     * Speak text with natural, calm, friendly voice
     * @param {string} text - The text to speak
     * @param {boolean} autoSpeak - Whether this is automatic speaking (auto-speak all responses)
     */
    speak(text, autoSpeak = false) {
        if (!this.speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // If auto-speaking and speech is already playing from manual trigger, don't interrupt
        if (autoSpeak && this.isSpeaking) {
            return;
        }

        // Cancel any ongoing speech if manually triggered
        if (!autoSpeak) {
            this.speechSynthesis.cancel();
        }

        // Clean text for speech (remove markdown, emojis, etc.)
        const cleanText = this.cleanTextForSpeech(text);

        if (!cleanText.trim()) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Set language
        utterance.lang = this.currentLanguage;

        // Set voice properties for natural, calm, friendly tone
        utterance.rate = 0.85; // Slightly slower for natural feel
        utterance.pitch = 1.1; // Slightly higher pitch for friendliness
        utterance.volume = 0.8; // Comfortable volume

        // Try to select a natural voice if available
        const voices = this.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice =>
            voice.lang.startsWith(this.currentLanguage.split('-')[0]) &&
            (voice.name.toLowerCase().includes('female') ||
             voice.name.toLowerCase().includes('natural') ||
             voice.name.toLowerCase().includes('calm'))
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // Event handlers
        utterance.onstart = () => {
            this.isSpeaking = true;
            console.log('Voice: Speaking started');
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            console.log('Voice: Speaking ended');
        };

        utterance.onerror = (error) => {
            this.isSpeaking = false;
            console.error('Voice: Speech synthesis error:', error);
        };

        this.currentUtterance = utterance;
        this.speechSynthesis.speak(utterance);
    }

    /**
     * Stop current speech
     */
    stop() {
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
            this.isSpeaking = false;
        }
    }

    /**
     * Check if currently speaking
     * @returns {boolean}
     */
    getIsSpeaking() {
        return this.isSpeaking;
    }

    /**
     * Clean text for speech synthesis
     * @param {string} text - Raw text
     * @returns {string} - Cleaned text
     */
    cleanTextForSpeech(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
            .replace(/⚠️/g, 'Warning:') // Replace warning emoji
            .replace(/🏥/g, '') // Remove hospital emoji
            .replace(/💚/g, '') // Remove heart emoji
            .replace(/🔊/g, '') // Remove play button emoji if present
            .replace(/📱/g, '') // Remove mobile emoji
            .replace(/💬/g, '') // Remove chat emoji
            .replace(/📝/g, '') // Remove quiz emoji
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
    }

    /**
     * Test speech functionality
     */
    testSpeech() {
        const testText = this.currentLanguage === 'te-IN'
            ? 'హలో, నేను మీ ఆరోగ్య సహాయకుడు. ఇది ధ్వని పరీక్ష.'
            : 'Hello, I am your health assistant. This is a voice test.';

        this.speak(testText, true);
    }

    /**
     * Get available voices for debugging
     */
    getAvailableVoices() {
        return this.speechSynthesis.getVoices();
    }

    /**
     * Get current voice info
     */
    getCurrentVoice() {
        const voices = this.speechSynthesis.getVoices();
        return voices.find(voice => voice === this.currentUtterance?.voice);
    }
}

// Create global instance
const voiceManager = new VoiceManager();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceManager;
}