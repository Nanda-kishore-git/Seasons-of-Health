<<<<<<< HEAD
# Seasons of Health 🌿🏥

A comprehensive multilingual health companion web application that provides seasonal health advice, disease information, AI-powered assistance, and location-based health center recommendations. Features bilingual support (English/Telugu), real-time weather integration, voice-to-voice AI assistant, and interactive health center mapping.

## Features ✨

### 🌐 **Multilingual Support**
- Full English ↔ Telugu language toggle
- Instant switching across all UI elements
- Bilingual AI responses and chat messages
- Translated disease information and quiz questions

### 🤖 **AI Health Assistant**
- Voice-to-voice interaction (English/Telugu)
- Real-time weather integration
- Seasonal health recommendations
- Interactive health assessment quiz
- Speech-to-text and text-to-speech capabilities

### 🌤️ **Weather Integration**
- Real-time weather data with OpenWeatherMap API
- Horizontal scrollable forecast cards
- Weather-based health recommendations
- Location-based weather alerts

### 🏥 **Health Centers Map**
- Interactive Leaflet.js map
- Nearest center highlighting with bounce animation
- Detailed info popup on marker click
- Distance calculation and routing

### 📊 **Disease Information**
- Comprehensive seasonal disease database
- Horizontal scrolling disease cards
- Symptoms, Prevention, Remedies, Self-care, Nutrition
- Instant language switching

### 📱 **Responsive Design**
- Mobile-first approach
- Vibrant gradients and animations
- Collapsible side panel navigation
- Touch-friendly interfaces

## Technology Stack 🛠️

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **APIs**: OpenAI, OpenWeatherMap, OpenRouter
- **Mapping**: Leaflet.js
- **Voice**: Web Speech API, Whisper API
- **Deployment**: Vercel

## Installation & Setup 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Environment Variables
Create a `.env` file in the root directory:

```bash
# OpenRouter API (for AI chat)
OPENROUTER_API_KEY=your_openrouter_api_key_here
MODEL_NAME=anthropic/claude-3-haiku

# OpenWeatherMap API
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/seasons-of-health.git
cd seasons-of-health
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
- Copy `.env.example` to `.env`
- Add your API keys as specified above

4. **Start the development server**
```bash
npm start
```

5. **Open in browser**
```
http://localhost:3000
```

## Vercel Deployment 📦

### Prerequisites for Vercel
- Vercel account
- Environment variables configured in Vercel dashboard

### Deployment Steps

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy to Vercel**
```bash
vercel --prod
```

3. **Configure Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add the following variables:
     ```
     OPENROUTER_API_KEY=your_openrouter_api_key_here
     MODEL_NAME=anthropic/claude-3-haiku
     OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
     NODE_ENV=production
     ```

4. **Redeploy** (if needed)
```bash
vercel --prod
```

## Project Structure 📁

```
seasons-of-health/
├── data/
│   └── diseases.json          # Bilingual disease database
├── public/
│   ├── css/
│   │   └── style.css         # Main stylesheet with gradients & animations
│   ├── js/
│   │   ├── language.js       # Language switching functionality
│   │   ├── weather.js        # Weather integration & forecast
│   │   ├── assistant.js      # AI chat, quiz, voice features
│   │   ├── voice.js          # Text-to-speech & speech-to-text
│   │   ├── diseases.js       # Disease information display
│   │   ├── healthcenters.js  # Map & health centers
│   │   └── ui.js            # UI interactions & animations
│   ├── index.html            # Home page
│   ├── assistant.html        # AI assistant & quiz page
│   ├── diseases.html         # Disease information page
│   ├── healthcenters.html    # Health centers map page
│   └── contact.html          # Contact form page
├── translations/
│   ├── en.json              # English translations
│   └── te.json              # Telugu translations
├── server.js                # Express.js backend server
├── package.json             # Node.js dependencies
├── .env                     # Environment variables (gitignored)
└── README.md               # This file
```

## Key Features Implementation 🔧

### Language System
- **Dynamic Translation**: All UI elements use `data-i18n` attributes
- **Real-time Switching**: Instant language changes without page reload
- **AI Integration**: Backend sends responses in selected language
- **Persistent Storage**: Language preference saved in localStorage

### Weather Integration
- **Real-time Data**: OpenWeatherMap API integration
- **Forecast Display**: Horizontal scrollable 24-hour forecast
- **Location Services**: GPS and manual location selection
- **Health Correlation**: Weather-based health advice

### Voice Features
- **Speech Recognition**: Web Speech API for English/Telugu
- **Text-to-Speech**: Responsive voice synthesis in selected language
- **Whisper Integration**: Robust speech-to-text via OpenRouter
- **Floating Interface**: Accessible voice-to-voice assistant

### Health Centers Map
- **Interactive Mapping**: Leaflet.js with OpenStreetMap
- **Nearest Center**: Automatic highlighting with bounce animation
- **Detailed Popups**: Click markers for comprehensive info
- **Distance Calculation**: Haversine formula for accurate distances

### Responsive Design
- **Mobile-First**: Optimized for touch devices
- **Flexible Layouts**: CSS Grid and Flexbox
- **Smooth Animations**: CSS transitions and transforms
- **Accessibility**: Focus states and keyboard navigation

## API Endpoints 📡

### Weather API
```javascript
GET /api/weather?lat={latitude}&lon={longitude}
// Returns current weather and 24-hour forecast
```

### Health Centers API
```javascript
GET /api/health-centers?lat={lat}&lon={lon}&category={category}
// Returns filtered health centers with distances
```

### AI Chat API
```javascript
POST /api/chat
// Body: { message, weatherData, location, language }
// Returns AI response in selected language
```

### Speech-to-Text API
```javascript
POST /api/transcribe
// FormData: audio file
// Headers: X-Language
// Returns transcribed text
```

## Browser Support 🌐

- Chrome 88+ (recommended)
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- OpenWeatherMap for weather data
- OpenRouter for AI services
- Leaflet.js for mapping functionality
- Font Awesome for icons

## Support 💬

For support, email support@seasonsofhealth.com or create an issue in this repository.

---

**Tagline**: Healthy Seasons, Healthy Lives 🌿❤️

Made with ❤️ for healthier communities worldwide
=======
# Seasons of Health

A comprehensive web application that provides seasonal health information, AI-powered health assistant, and community health resources. The app specializes in seasonal diseases like Dengue, Malaria, Flu, Cold, Typhoid, and Heat Stroke, offering evidence-based advice tailored to weather conditions.

## Features

### 🏠 Home Page
- Welcome dashboard with overview of seasonal health information
- Weather integration for location-based health recommendations
- Multilingual support (English and Telugu)

### 🤖 AI Health Assistant
- Interactive chatbot powered by OpenRouter API
- Specialized in seasonal diseases and health prevention
- Voice input and output capabilities using Web Speech API
- Real-time weather data integration for personalized advice
- Medical disclaimers and evidence-based responses

### 📊 Disease Information
- Detailed information about seasonal diseases
- Prevention tips and symptoms
- Weather-correlated health advice

### 💚 Self-Care Tips
- Seasonal wellness recommendations
- Preventive healthcare measures
- Lifestyle tips based on weather conditions

### 🏥 Health Centers
- Directory of nearby healthcare facilities
- Emergency contact information
- Location-based health resource locator

### 📞 Contact Us
- User feedback collection system
- JSON-based storage for form submissions
- Support and improvement suggestions

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **RESTful APIs** for chat functionality and data handling
- **File-based JSON storage** for user feedback
- **Environment variables** for API key management

### Frontend
- **HTML5**, **CSS3**, and **Vanilla JavaScript**
- **Responsive design** with mobile-first approach
- **Web Speech API** for voice recognition and text-to-speech
- **Async/await** for API communications

### External APIs
- **OpenRouter API** for AI-powered health responses
- **OpenWeatherMap API** for weather data integration

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Git

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd seasons-of-health
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   MODEL_NAME=your_preferred_model_name
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
seasons-of-health/
├── server.js                 # Main Express server
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
├── README.md                # Project documentation
├── public/                  # Static web files
│   ├── index.html           # Home page
│   ├── assistant.html       # AI Assistant page
│   ├── diseases.html        # Disease information
│   ├── selfcare.html        # Self-care tips
│   ├── healthcenters.html   # Health centers
│   ├── contact.html         # Contact form
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       ├── ui.js            # UI interactions
│       ├── language.js      # Multilingual support
│       ├── weather.js       # Weather API integration
│       └── assistant.js     # Chatbot functionality
├── translations/            # Language files
│   ├── en.json              # English translations
│   └── te.json              # Telugu translations
└── data/                    # JSON storage directory
    └── feedback.json        # User feedback submissions
```

## API Endpoints

### Health Check
- `GET /api/health` - Server status check

### Chat API
- `POST /api/chat` - Send message to AI assistant
  ```json
  {
    "message": "User's health question",
    "weatherData": {
      "temperature": 25,
      "humidity": 65,
      "location": "City Name"
    }
  }
  ```

### Weather API (Placeholder)
- `GET /api/weather` - Weather data endpoint (implementation pending)

## Usage Guide

### For Users
1. **Navigate the Website:** Use the navigation menu to explore different sections
2. **AI Assistant:** Click on "AI Assistant" to interact with the health chatbot
3. **Voice Features:** Use microphone icons to speak to the assistant
4. **Language Selection:** Choose between English and Telugu using the language selector
5. **Contact Form:** Submit feedback or questions through the contact page

### For Developers
1. **Local Development:** Run `npm run dev` for hot reloading
2. **Testing:** Open browser console for debugging API calls
3. **Customization:** Modify translations in `/translations/` folder
4. **API Integration:** Update API keys in `.env` file

## Features Overview

### Voice Capabilities
- **Speech Recognition:** Click microphone to speak queries
- **Text-to-Speech:** Listen to assistant responses
- **Multi-language Support:** Voice input supports selected language

### Data Storage
- **Local JSON Storage:** Contact form submissions saved to `data/feedback.json`
- **Timestamp Tracking:** Each submission includes date/time
- **Data Privacy:** No personal data transmitted externally

### Responsive Design
- **Mobile-First:** Optimized for smartphones and tablets
- **Cross-Browser:** Compatible with modern web browsers
- **Accessibility:** Screen reader friendly and keyboard navigation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Medical Disclaimer

**This application provides general health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for personal health concerns. The AI assistant's responses are generated based on general knowledge and should not be used as medical advice.**

## Support

For technical support or questions:
- Email: support@seasonsofhealth.com
- GitHub Issues: Report bugs and request features

## Future Enhancements

- [ ] Offline functionality with PWA support
- [ ] Advanced AI model integration
- [ ] Real-time health alerts based on location
- [ ] Integration with local health department APIs
- [ ] User accounts and health history tracking
- [ ] Mobile application development
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
