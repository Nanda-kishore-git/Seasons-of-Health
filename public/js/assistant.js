/**
<<<<<<< HEAD
 * AI Health Assistant Chatbot & Quiz
 * Integrates with backend API, handles weather data, yes/no questions, voice input/output, quiz functionality, and displays disclaimers
=======
 * AI Health Assistant Chatbot
 * Integrates with backend API, handles weather data, yes/no questions, voice input/output, and displays disclaimers
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
 */

class AssistantManager {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.querySelector('.send-button');
        this.voiceButton = document.getElementById('voiceButton');
<<<<<<< HEAD
        this.floatingMicBtn = document.getElementById('floatingMicBtn');
        this.isTyping = false;
        this.conversationHistory = [];
        this.isListening = false;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.speechRecognition = null;
        this.speechSynthesis = window.speechSynthesis;

        // Quiz properties
        this.currentMode = 'chat'; // 'chat' or 'quiz'
        this.quizQuestions = [];
        this.currentQuestionIndex = 0;
        this.quizAnswers = [];
        this.diseasesData = null;

=======
        this.isTyping = false;
        this.conversationHistory = [];
        this.isListening = false;
        this.speechRecognition = null;
        this.speechSynthesis = window.speechSynthesis;

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

<<<<<<< HEAD
    /**
     * Translate simple options like Yes/No
     */
    translateOption(option) {
        const optionMap = {
            'Yes': this.translate('ui.buttons.submit'),
            'No': this.translate('ui.buttons.cancel'),
            'సమ్మతి': this.translate('ui.buttons.submit'), // Telugu Yes
            'వద్దు': this.translate('ui.buttons.cancel') // Telugu No
        };
        return optionMap[option] || option;
    }

    init() {
        this.bindEvents();
        this.initSpeechRecognition();
        this.loadDiseasesData();
        this.initQuizQuestions();

        // Listen for language change events
        window.addEventListener('languageChanged', (e) => {
            this.handleLanguageChange(e.detail.language);
        });
=======
    init() {
        this.bindEvents();
        this.initSpeechRecognition();
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)

        // Check if there's a pending query from diseases page
        const pendingQuery = sessionStorage.getItem('assistantQuery');
        const sourcePage = sessionStorage.getItem('sourcePage');

        if (pendingQuery && sourcePage === 'diseases') {
            // Clear the stored query
            sessionStorage.removeItem('assistantQuery');
            sessionStorage.removeItem('sourcePage');

            // Auto-send the query
            setTimeout(() => {
                this.chatInput.value = pendingQuery;
                this.sendMessage();
            }, 500);
        } else if (!this.chatMessages.querySelector('.message.bot')) {
            this.addMessage(this.translate('assistant.prompts.greeting'), 'bot');
        }
<<<<<<< HEAD

        // Update existing messages when language changes
        this.updateExistingMessagesLanguage();
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    bindEvents() {
        // Send message on button click
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }

        // Voice button event
        if (this.voiceButton) {
            this.voiceButton.addEventListener('click', () => this.toggleVoiceInput());
        }

<<<<<<< HEAD
        // Floating mic button event
        if (this.floatingMicBtn) {
            this.floatingMicBtn.addEventListener('click', () => this.toggleSpeechToText());
        }

=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        // Send message on Enter key
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Handle input changes to show/hide send button
            this.chatInput.addEventListener('input', () => {
                this.updateSendButtonState();
            });
        }
    }

    updateSendButtonState() {
        if (this.sendButton) {
            const hasText = this.chatInput.value.trim().length > 0;
            this.sendButton.disabled = this.isTyping || !hasText;
            this.sendButton.style.opacity = (this.isTyping || !hasText) ? '0.5' : '1';
        }
    }

    initSpeechRecognition() {
        // Check for browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn('Speech recognition not supported in this browser');
            if (this.voiceButton) {
                this.voiceButton.style.display = 'none';
            }
            return;
        }

        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.continuous = false;
        this.speechRecognition.interimResults = false;
        this.speechRecognition.lang = 'en-US'; // Default to English

        // Update language based on current selection
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            this.updateSpeechLanguage(languageSelect.value);
            languageSelect.addEventListener('change', (e) => {
                this.updateSpeechLanguage(e.target.value);
            });
        }

        this.speechRecognition.onstart = () => {
            this.isListening = true;
            this.voiceButton.classList.add('listening');
            console.log('Voice recognition started');
        };

        this.speechRecognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.chatInput.value = transcript;
            this.updateSendButtonState();
            // Auto-send the message
            setTimeout(() => {
                this.sendMessage();
            }, 500);
        };

        this.speechRecognition.onend = () => {
            this.isListening = false;
            this.voiceButton.classList.remove('listening');
            console.log('Voice recognition ended');
        };

        this.speechRecognition.onerror = (event) => {
            this.isListening = false;
            this.voiceButton.classList.remove('listening');
            console.error('Speech recognition error:', event.error);
            this.addMessage('Sorry, I couldn\'t hear you clearly. Please try again or type your message.', 'bot');
        };
    }

<<<<<<< HEAD
    async toggleSpeechToText() {
        if (this.isRecording) {
            await this.stopRecording();
        } else {
            await this.startRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                await this.transcribeAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.isRecording = true;
            this.floatingMicBtn.classList.add('recording');
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Unable to access microphone. Please check your permissions.');
        }
    }

    async stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.floatingMicBtn.classList.remove('recording');
            console.log('Recording stopped');
        }
    }

    async transcribeAudio(audioBlob) {
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob);

            // Get current language from language selector
            const languageSelect = document.getElementById('languageSelect');
            const language = languageSelect ? languageSelect.value : 'en';

            const response = await fetch('/api/transcribe', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Language': language
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data.transcription) {
                // Set transcribed text in input and send message
                this.chatInput.value = data.transcription;
                this.updateSendButtonState();
                this.sendMessage();
            } else {
                this.addMessage('Sorry, I couldn\'t transcribe your speech. Please try again or type your message.', 'bot');
            }
        } catch (error) {
            console.error('Transcription error:', error);
            this.addMessage('Sorry, there was an error transcribing your speech. Please try again or type your message.', 'bot');
        }
    }

=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    updateSpeechLanguage(lang) {
        if (this.speechRecognition) {
            // Map language codes to speech recognition languages
            const langMap = {
                'en': 'en-US',
                'te': 'te-IN'
            };
            this.speechRecognition.lang = langMap[lang] || 'en-US';
        }
    }

    toggleVoiceInput() {
        if (!this.speechRecognition) {
            alert('Voice input is not supported in your browser.');
            return;
        }

        if (this.isListening) {
            this.speechRecognition.stop();
        } else {
            try {
                this.speechRecognition.start();
            } catch (error) {
                console.error('Error starting speech recognition:', error);
                alert('Unable to start voice recognition. Please try again.');
            }
        }
    }

<<<<<<< HEAD
    speakText(text, autoSpeak = true) {
        // Use the VoiceManager for consistent speech synthesis
        if (typeof voiceManager !== 'undefined') {
            voiceManager.speak(text, autoSpeak);
        } else {
            console.warn('VoiceManager not available, speech synthesis disabled');
        }
=======
    speakText(text) {
        if (!this.speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // Cancel any ongoing speech
        this.speechSynthesis.cancel();

        // Clean text for speech (remove markdown, emojis, etc.)
        const cleanText = text
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
            .replace(/⚠️/g, 'Warning:') // Replace warning emoji
            .replace(/🏥/g, '') // Remove hospital emoji
            .replace(/💚/g, '') // Remove heart emoji
            .replace(/\n/g, ' ') // Replace newlines with spaces
            .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);

        // Get current language for speech
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            const lang = languageSelect.value;
            utterance.lang = lang === 'te' ? 'te-IN' : 'en-US';
        } else {
            utterance.lang = 'en-US';
        }

        // Set speech properties
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;
        utterance.volume = 0.8;

        // Add visual feedback for speech
        utterance.onstart = () => {
            console.log('Speaking response');
        };

        utterance.onend = () => {
            console.log('Finished speaking');
        };

        utterance.onerror = (error) => {
            console.error('Speech synthesis error:', error);
        };

        this.speechSynthesis.speak(utterance);
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    async sendMessage() {
        if (this.isTyping) return;

        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.updateSendButtonState();

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Get current weather and location data
            const weatherData = weatherManager.getWeatherData();
            const locationData = weatherManager.getCurrentLocation();

<<<<<<< HEAD
            // Send to backend API with enhanced context including language
            const currentLanguage = languageManager ? languageManager.getCurrentLanguage() : 'en';
=======
            // Send to backend API with enhanced context
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
<<<<<<< HEAD
                    'Accept-Language': currentLanguage,
                    'X-Language': currentLanguage,
                    'X-Weather-Data': weatherData ? JSON.stringify(weatherData) : '',
                    'X-Location-Data': locationData ? JSON.stringify(locationData) : ''
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
                },
                body: JSON.stringify({
                    message: message,
                    weatherData: weatherData,
<<<<<<< HEAD
                    location: locationData,
                    language: currentLanguage
=======
                    location: locationData
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            // Hide typing indicator
            this.hideTypingIndicator();

<<<<<<< HEAD
            // Add bot response with disclaimer in selected language
            if (data.response) {
                const disclaimer = this.translate('disclaimers.medical');
                const fullResponse = `${data.response}\n\n⚠️ **${disclaimer}**`;
                this.addMessage(fullResponse, 'bot');
                // Speak the response after a short delay
                setTimeout(() => {
                    this.speakText(fullResponse);
                }, 1000);
            } else if (data.error) {
                const errorMsg = this.translate('assistant.responses.error');
                this.addMessage(`Error: ${data.error}\n\n⚠️ **${this.translate('disclaimers.medical')}**`, 'bot');
            } else {
                const fallbackMsg = this.translate('assistant.responses.error');
                this.addMessage(`${fallbackMsg}\n\n⚠️ **${this.translate('disclaimers.medical')}**`, 'bot');
=======
            // Add bot response
            if (data.response) {
                this.addMessage(data.response, 'bot');
                // Speak the response after a short delay
                setTimeout(() => {
                    this.speakText(data.response);
                }, 1000);
            } else if (data.error) {
                this.addMessage(`Error: ${data.error}`, 'bot');
            } else {
                this.addMessage('Sorry, I couldn\'t process your request. Please try again.', 'bot');
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
            }

        } catch (error) {
            console.error('Chat error:', error);
            this.hideTypingIndicator();
<<<<<<< HEAD
            const errorMessage = currentLanguage === 'te'
                ? 'క్షమించండి, నేను సాంకేతిక సమస్యలను ఎదుర్కొంటున్నాను. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.'
                : 'Sorry, I\'m experiencing technical difficulties. Please try again later.';
            this.addMessage(errorMessage, 'bot');
=======
            this.addMessage('Sorry, I\'m experiencing technical difficulties. Please try again later.', 'bot');
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        // Format the message content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Handle markdown-like formatting for bold text
        let formattedText = text;
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/^⚠️ /gm, '<i class="fas fa-exclamation-triangle"></i> ');

        // Convert newlines to <br>
        formattedText = formattedText.replace(/\n/g, '<br>');

        contentDiv.innerHTML = `<p>${formattedText}</p>`;
        messageDiv.appendChild(contentDiv);

<<<<<<< HEAD
        // Add play button for bot messages (TTS replay)
        if (sender === 'bot') {
            const playButton = document.createElement('button');
            playButton.className = 'play-button';
            playButton.innerHTML = '🔊';
            playButton.title = 'Play voice';
            playButton.onclick = () => {
                this.speakText(text, false); // Manual replay, not auto-speak
            };
            contentDiv.appendChild(playButton);
        }

=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
        // Add event listeners to disable highlight effects on interaction
        const disableHighlight = () => {
            contentDiv.style.transform = 'none';
            contentDiv.style.background = sender === 'bot' ? '#4CAF50' : '#E8F5E8';
            contentDiv.style.boxShadow = '0 1px 5px rgba(0,0,0,0.1)';
        };

        contentDiv.addEventListener('mouseenter', disableHighlight);
        contentDiv.addEventListener('mouseleave', () => {
            // Reset to default state
            contentDiv.style.transform = '';
            contentDiv.style.background = '';
            contentDiv.style.boxShadow = '';
        });

        contentDiv.addEventListener('click', disableHighlight);
        contentDiv.addEventListener('touchstart', disableHighlight);

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        // Store in conversation history for context
        this.conversationHistory.push({
            text: text,
            sender: sender,
            timestamp: new Date()
        });

        // Limit history to last 50 messages
        if (this.conversationHistory.length > 50) {
            this.conversationHistory.shift();
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.updateSendButtonState();

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.updateSendButtonState();

        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Handle yes/no questions specifically
    isYesNoQuestion(message) {
        const lowerMessage = message.toLowerCase();
        return lowerMessage.includes('yes or no') ||
               lowerMessage.includes('do you') ||
               lowerMessage.includes('are you') ||
               lowerMessage.includes('can you') ||
               lowerMessage.includes('should i') ||
               lowerMessage.includes('is it') ||
               lowerMessage.includes('does it') ||
               lowerMessage.includes('will i') ||
               lowerMessage.includes('can i') ||
               lowerMessage.match(/\b(yes|no|maybe|perhaps)\b.*\?/);
    }

    // Get conversation context for better responses
    getConversationContext() {
        return this.conversationHistory.slice(-6); // Last 6 messages for context
    }

    // Clear chat history
    clearHistory() {
        this.conversationHistory = [];
        this.chatMessages.innerHTML = '';
<<<<<<< HEAD
        // Clear language preference on refresh/cache clear
        localStorage.removeItem('language');
        // Reset to default language
        if (languageManager) {
            languageManager.setLanguage('en');
        }
        this.addMessage(this.translate('assistant.prompts.greeting'), 'bot');
    }

    // Quiz methods
    async loadDiseasesData() {
        try {
            const response = await fetch('/data/diseases.json');
            this.diseasesData = await response.json();
        } catch (error) {
            console.error('Error loading diseases data:', error);
            this.diseasesData = {};
        }
    }

    // Initialize quiz questions
    initQuizQuestions() {
        this.quizQuestions = [
            {
                id: 'fever',
                question: 'quiz.questions.fever',
                options: ['Yes', 'No'],
                symptom: 'fever'
            },
            {
                id: 'headache',
                question: 'quiz.questions.headache',
                options: ['Yes', 'No'],
                symptom: 'headache'
            },
            {
                id: 'cough',
                question: 'quiz.questions.cough',
                options: ['Yes', 'No'],
                symptom: 'cough'
            },
            {
                id: 'fatigue',
                question: 'quiz.questions.fatigue',
                options: ['Yes', 'No'],
                symptom: 'fatigue'
            },
            {
                id: 'bodyPain',
                question: 'quiz.questions.bodyPain',
                options: ['Yes', 'No'],
                symptom: 'body aches'
            },
            {
                id: 'nausea',
                question: 'quiz.questions.nausea',
                options: ['Yes', 'No'],
                symptom: 'nausea'
            },
            {
                id: 'rash',
                question: 'quiz.questions.rash',
                options: ['Yes', 'No'],
                symptom: 'rash'
            },
            {
                id: 'chills',
                question: 'quiz.questions.chills',
                options: ['Yes', 'No'],
                symptom: 'chills'
            }
        ];
    }

    // Set interaction mode
    setMode(mode) {
        this.currentMode = mode;

        const chatContainer = document.getElementById('chatContainer');
        const quizContainer = document.getElementById('quizContainer');
        const chatModeBtn = document.getElementById('chatModeBtn');
        const quizModeBtn = document.getElementById('quizModeBtn');

        if (mode === 'chat') {
            chatContainer.style.display = 'flex';
            quizContainer.style.display = 'none';
            chatModeBtn.classList.add('active');
            quizModeBtn.classList.remove('active');
        } else if (mode === 'quiz') {
            chatContainer.style.display = 'none';
            quizContainer.style.display = 'flex';
            chatModeBtn.classList.remove('active');
            quizModeBtn.classList.add('active');
            this.startQuiz();
        }
    }

    // Start quiz
    startQuiz() {
        this.currentQuestionIndex = 0;
        this.quizAnswers = [];
        this.showQuestion(0);
        document.getElementById('prevQuestionBtn').style.display = 'none';
        document.getElementById('nextQuestionBtn').style.display = 'inline-flex';
        document.getElementById('quizResults').style.display = 'none';
    }

    // Show question
    showQuestion(index) {
        const questionsContainer = document.getElementById('quizQuestions');
        const question = this.quizQuestions[index];
        const translatedQuestion = this.translate(question.question);
        const translatedOptions = question.options.map(option => this.translateOption(option));

        questionsContainer.innerHTML = `
            <div class="quiz-question">
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(index + 1) / this.quizQuestions.length * 100}%"></div>
                    </div>
                    <span class="progress-text">${index + 1} / ${this.quizQuestions.length}</span>
                </div>
                <h3>${translatedQuestion}</h3>
                <div class="quiz-options">
                    ${translatedOptions.map((option, optionIndex) => `
                        <div class="quiz-option ${this.quizAnswers[index] && this.quizAnswers[index].answer === question.options[optionIndex] ? 'selected' : ''}" onclick="selectQuizOption(${index}, ${optionIndex}, '${question.options[optionIndex]}')" data-option="${optionIndex}">
                            <span class="option-text">${option}</span>
                            <span class="option-indicator"></span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Update navigation buttons
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');

        prevBtn.style.display = index > 0 ? 'inline-flex' : 'none';
        prevBtn.innerHTML = `<i class="fas fa-arrow-left"></i> ${this.translate('quiz.buttons.previous')}`;

        if (index === this.quizQuestions.length - 1) {
            nextBtn.innerHTML = `<i class="fas fa-check"></i> ${this.translate('quiz.buttons.getResults')}`;
            nextBtn.onclick = () => this.showQuizResults();
            // Disable next button if no answer selected
            nextBtn.disabled = !this.quizAnswers[index];
        } else {
            nextBtn.innerHTML = `${this.translate('quiz.buttons.next')} <i class="fas fa-arrow-right"></i>`;
            nextBtn.onclick = () => this.nextQuestion();
            // Disable next button if no answer selected
            nextBtn.disabled = !this.quizAnswers[index];
        }
    }

    // Select quiz option
    selectQuizOption(questionIndex, optionIndex, optionValue) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, idx) => {
            opt.classList.toggle('selected', idx === optionIndex);
        });

        // Store answer
        this.quizAnswers[questionIndex] = {
            questionId: this.quizQuestions[questionIndex].id,
            answer: optionValue,
            symptom: this.quizQuestions[questionIndex].symptom
        };

        // Auto-advance to next question after selection on mobile
        if (window.innerWidth <= 768 && questionIndex < this.quizQuestions.length - 1) {
            setTimeout(() => {
                this.nextQuestion();
            }, 800); // Brief delay to show selection
        }
    }

    // Navigate to next question
    nextQuestion() {
        // Check if current question has an answer before proceeding
        if (!this.quizAnswers[this.currentQuestionIndex]) {
            alert(this.translate('ui.error') || 'Please select an answer before proceeding.');
            return;
        }

        if (this.currentQuestionIndex < this.quizQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion(this.currentQuestionIndex);
        }
    }

    // Navigate to previous question
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion(this.currentQuestionIndex);
        }
    }

    // Show quiz results
    showQuizResults() {
        // Check if all questions are answered
        const unansweredCount = this.quizQuestions.length - this.quizAnswers.filter(a => a).length;
        if (unansweredCount > 0) {
            alert(`${this.translate('ui.error') || 'Error'}: ${unansweredCount} ${unansweredCount === 1 ? 'question' : 'questions'} not answered. Please complete all questions.`);
            return;
        }

        const resultsContainer = document.getElementById('quizResults');
        const questionsContainer = document.getElementById('quizQuestions');

        // Analyze symptoms and match diseases
        const matchedDiseases = this.analyzeSymptoms();

        questionsContainer.style.display = 'none';
        document.querySelector('.quiz-navigation').style.display = 'none';
        resultsContainer.style.display = 'block';

        let resultsHTML = `<h3>${this.translate('quiz.results.title')}</h3>`;

        if (matchedDiseases.length > 0) {
            matchedDiseases.forEach(disease => {
                const currentLang = this.getCurrentLanguage();
                const diseaseName = disease[currentLang]?.name || disease.en.name;
                const symptoms = disease[currentLang]?.symptoms || disease.en.symptoms;
                const prevention = disease[currentLang]?.prevention || disease.en.prevention;
                const treatments = disease[currentLang]?.treatments || disease.en.treatments;

                resultsHTML += `
                    <div class="disease-result">
                        <h4>${diseaseName}</h4>
                        <div class="symptoms"><strong>${this.translate('diseases.commonDiseases.flu.symptoms')}:</strong> ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms}</div>
                        <div class="prevention"><strong>${this.translate('diseases.commonDiseases.flu.prevention')}:</strong> ${Array.isArray(prevention) ? prevention.join(', ') : prevention}</div>
                        <div class="remedies"><strong>${this.translate('diseases.commonDiseases.flu.treatments')}:</strong> ${Array.isArray(treatments) ? treatments.join(', ') : treatments}</div>
                    </div>
                `;
            });
        } else {
            resultsHTML += `<p>${this.translate('quiz.results.noDiseases')}</p>`;
        }

        resultsHTML += `<p style="margin-top: 15px; font-size: 14px; color: #666; font-style: italic;">${this.translate('disclaimers.medical')}</p>`;

        // Add AI advice section
        const advice = this.generateAIAdvice();
        resultsHTML += `
            <div class="advice-section">
                <h4>${this.translate('quiz.results.aiAdvice')}</h4>
                <p>${advice}</p>
                <button class="restart-btn" onclick="window.assistantManager.restartQuiz()">${this.translate('quiz.buttons.restart')}</button>
            </div>
            <div style="margin-top: 15px; font-size: 12px; color: #999; font-style: italic;">
                ${this.translate('disclaimers.ai')}
            </div>
        `;

        resultsContainer.innerHTML = resultsHTML;
    }

    // Analyze symptoms and match diseases
    analyzeSymptoms() {
        const userSymptoms = this.quizAnswers
            .filter(answer => answer.answer === 'Yes')
            .map(answer => answer.symptom.toLowerCase());

        const matchedDiseases = [];
        const currentLang = this.getCurrentLanguage();

        for (const [diseaseKey, diseaseData] of Object.entries(this.diseasesData)) {
            const diseaseSymptoms = diseaseData[currentLang]?.symptoms || diseaseData.en.symptoms;
            const lowerDiseaseSymptoms = diseaseSymptoms.map(s => s.toLowerCase());

            // Check if user has at least one matching symptom
            const hasMatchingSymptom = userSymptoms.some(userSymptom =>
                lowerDiseaseSymptoms.some(diseaseSymptom =>
                    diseaseSymptom.includes(userSymptom) || userSymptom.includes(diseaseSymptom.split(' ')[0])
                )
            );

            if (hasMatchingSymptom) {
                matchedDiseases.push(diseaseData);
            }
        }

        return matchedDiseases.slice(0, 3); // Return top 3 matches
    }

    // Generate AI advice based on answers and weather
    generateAIAdvice() {
        const weatherData = weatherManager ? weatherManager.getWeatherData() : null;
        const hasFever = this.quizAnswers.some(a => a.questionId === 'fever' && a.answer === 'Yes');
        const hasFatigue = this.quizAnswers.some(a => a.questionId === 'fatigue' && a.answer === 'Yes');
        const hasBodyPain = this.quizAnswers.some(a => a.questionId === 'bodyPain' && a.answer === 'Yes');

        let advice = "Always remember that I'm not a substitute for professional medical advice. ";

        if (hasFever) {
            advice += "For fever, stay hydrated, rest, and monitor your temperature. ";
        }

        if (hasFatigue || hasBodyPain) {
            advice += "Rest and stay hydrated. Consider light stretching or warm compresses for body pain. ";
        }

        // Enhanced weather-based advice with specific time and conditions
        if (weatherData) {
            const temp = weatherData.temperature;
            const condition = weatherData.description;
            const humidity = weatherData.humidity;
            const currentHour = new Date().getHours();

            // Temperature and time-based advice
            if (temp >= 33) {
                advice += `It's ${temp}°C and ${condition.toLowerCase()}; avoid outdoor activities between 12–4 PM. `;
                if (humidity > 70) {
                    advice += "High humidity can make it feel even hotter - stay hydrated and find air-conditioned spaces. ";
                }
            } else if (temp >= 25 && temp < 33) {
                advice += `Current temperature is ${temp}°C with ${condition.toLowerCase()} conditions. `;
                if (currentHour >= 12 && currentHour <= 15) {
                    advice += "The midday heat is intense - consider indoor activities if you feel fatigued. ";
                }
            } else if (temp < 15) {
                advice += `In cooler weather at ${temp}°C, keep warm and consider indoor activities. `;
            }

            // General weather impact on symptoms
            if (hasFever && temp > 28) {
                advice += "High temperatures can exacerbate fever symptoms - rest in cool areas and stay hydrated. ";
            }
        }

        advice += "If symptoms persist or worsen, please consult a healthcare professional immediately.";

        return advice;
    }

    // Restart quiz
    restartQuiz() {
        this.startQuiz();
        document.getElementById('quizQuestions').style.display = 'block';
        document.querySelector('.quiz-navigation').style.display = 'flex';
        document.getElementById('quizResults').style.display = 'none';
    }

    // Get current language
    getCurrentLanguage() {
        return languageManager ? languageManager.getCurrentLanguage() : 'en';
    }

    // Handle language change event
    handleLanguageChange(newLanguage) {
        // Update existing messages
        this.updateExistingMessagesLanguage();

        // Update quiz content if currently displayed
        if (this.currentMode === 'quiz') {
            this.updateQuizOnLanguageChange();
        }

        // Update speech recognition language
        this.updateSpeechLanguage(newLanguage);
    }

    // Update existing chat messages when language changes
    updateExistingMessagesLanguage() {
        // Only update bot messages that contain translated content
        // User messages remain in their original language as per requirement
        const messages = this.chatMessages.querySelectorAll('.message.bot');
        messages.forEach(messageDiv => {
            const contentDiv = messageDiv.querySelector('.message-content p');
            if (contentDiv) {
                const originalText = contentDiv.textContent;
                // Re-translate only if it's a standard translated message
                if (originalText === this.translate('assistant.prompts.greeting') ||
                    originalText === this.translate('assistant.responses.thinking') ||
                    originalText === this.translate('assistant.responses.error')) {
                    contentDiv.textContent = this.translate(originalText);
                }
                // Also update disclaimer text
                const disclaimerPattern = /⚠️ \*\*.*?\*\*/;
                if (disclaimerPattern.test(originalText)) {
                    const newDisclaimer = this.translate('disclaimers.medical');
                    contentDiv.innerHTML = originalText.replace(disclaimerPattern, `⚠️ **${newDisclaimer}**`);
                }
            }
        });
    }

    // Update quiz content when language changes
    updateQuizOnLanguageChange() {
        // Re-render current question if quiz is active
        if (this.currentQuestionIndex >= 0 && this.quizQuestions[this.currentQuestionIndex]) {
            this.showQuestion(this.currentQuestionIndex);
        }

        // Update quiz results if displayed
        const resultsContainer = document.getElementById('quizResults');
        if (resultsContainer && resultsContainer.style.display !== 'none') {
            // Re-generate results in new language
            this.showQuizResults();
        }
    }
=======
        this.addMessage(this.translate('assistant.prompts.greeting'), 'bot');
    }
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to load
    setTimeout(() => {
        if (typeof languageManager !== 'undefined' && typeof weatherManager !== 'undefined') {
            window.assistantManager = new AssistantManager();
        } else {
            console.warn('Required dependencies not loaded. Retrying...');
            // Retry after a short delay
            setTimeout(() => {
                window.assistantManager = new AssistantManager();
            }, 1000);
        }
    }, 100);
});

<<<<<<< HEAD
// Global functions for quiz interaction
function setMode(mode) {
    if (window.assistantManager) {
        window.assistantManager.setMode(mode);
    }
}

function selectQuizOption(questionIndex, optionIndex, optionValue) {
    if (window.assistantManager) {
        window.assistantManager.selectQuizOption(questionIndex, optionIndex, optionValue);
    }
}

function nextQuestion() {
    if (window.assistantManager) {
        window.assistantManager.nextQuestion();
    }
}

function previousQuestion() {
    if (window.assistantManager) {
        window.assistantManager.previousQuestion();
    }
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssistantManager;
}

=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssistantManager;
}