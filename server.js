// Load disease data at startup
let diseaseData = {};
try {
  const diseaseDataPath = path.join(__dirname, 'data', 'diseases.json');
  const diseaseContent = fs.readFileSync(diseaseDataPath, 'utf8');
  diseaseData = JSON.parse(diseaseContent);
  console.log('Disease data loaded successfully');
} catch (error) {
  console.error('Failed to load disease data:', error);
}

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
    dest: '/tmp/' // Temporary directory for uploads
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
fs.mkdir(dataDir, { recursive: true }).catch(err => console.log('Data directory already exists'));

// Simple API route for interactions
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Seasons of Health backend is running' });
});

// Weather API endpoint with forecast support
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Weather API key not configured' });
        }

        // Fetch current weather
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const currentResponse = await fetch(currentUrl);

        if (!currentResponse.ok) {
            throw new Error(`Weather API error: ${currentResponse.status}`);
        }

        const currentData = await currentResponse.json();

        // Fetch 24-hour forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok) {
            throw new Error(`Forecast API error: ${forecastResponse.status}`);
        }

        const forecastData = await forecastResponse.json();

        // Process forecast data (next 24 hours)
        const forecast = forecastData.list.slice(0, 8).map(item => ({
            time: new Date(item.dt * 1000).toISOString(),
            temperature: Math.round(item.main.temp),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            precipitation: item.pop * 100
        }));

        // Process current weather with additional details
        const weatherData = {
            location: currentData.name,
            country: currentData.sys.country,
            coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
            temperature: Math.round(currentData.main.temp),
            feelsLike: Math.round(currentData.main.feels_like),
            humidity: currentData.main.humidity,
            description: currentData.weather[0].description,
            icon: currentData.weather[0].icon,
            windSpeed: currentData.wind.speed,
            pressure: currentData.main.pressure,
            visibility: currentData.visibility,
            sunrise: new Date(currentData.sys.sunrise * 1000).toISOString(),
            sunset: new Date(currentData.sys.sunset * 1000).toISOString(),
            forecast: forecast,
            timestamp: new Date().toISOString()
        };

        res.json(weatherData);

    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).json({
            error: 'Failed to fetch weather data',
            fallback: {
                temperature: 28,
                humidity: 65,
                description: 'Weather data temporarily unavailable'
            }
        });
    }
});

// Health centers API endpoint
app.get('/api/health-centers', async (req, res) => {
    try {
        const { lat, lon, category, limit } = req.query;

        // Predefined health centers data (could be moved to a database later)
        const healthCenters = [
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

        let filteredCenters = healthCenters;

        // Filter by category if specified
        if (category && category !== 'all') {
            filteredCenters = filteredCenters.filter(center => center.category === category);
        }

        // Calculate distances and sort if user location provided
        if (lat && lon) {
            const userLat = parseFloat(lat);
            const userLon = parseFloat(lon);

            filteredCenters = filteredCenters.map(center => ({
                ...center,
                distance: calculateDistance(userLat, userLon, center.lat, center.lon)
            })).sort((a, b) => a.distance - b.distance);
        }

        // Apply limit if specified
        if (limit) {
            filteredCenters = filteredCenters.slice(0, parseInt(limit));
        }

        res.json({
            centers: filteredCenters,
            total: filteredCenters.length,
            userLocation: lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null
        });

    } catch (error) {
        console.error('Health centers API error:', error);
        res.status(500).json({ error: 'Failed to fetch health centers data' });
    }
});

// Helper function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Helper function to determine current season
function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // getMonth() returns 0-11
    if (month >= 3 && month <= 5) return 'summer';
    if (month >= 6 && month <= 9) return 'rainy';
    if (month >= 10 && month <= 11) return 'winter';
    return 'winter'; // December to February
}

// Helper function to provide weather impact analysis
function getWeatherImpact(weatherData, season) {
    const temp = weatherData.temperature;
    const humidity = weatherData.humidity;
    const description = weatherData.description.toLowerCase();

    let impact = [];

    // Temperature impact
    if (temp >= 35) impact.push('extremely hot - risk of heatstroke, dehydration');
    else if (temp >= 28 && temp < 35) impact.push('warm - monitor hydration, avoid peak sun');
    else if (temp >= 20 && temp < 28) impact.push('comfortable temperature');
    else if (temp >= 15 && temp < 20) impact.push('cool - dress warmly');
    else if (temp < 15) impact.push('cold - risk of respiratory issues');

    // Humidity impact
    if (humidity > 80) impact.push('very humid - increased mosquito activity, fungal infections');
    else if (humidity > 60) impact.push('humid - monitor for moisture-related issues');
    else if (humidity < 30) impact.push('dry - skin and respiratory irritation possible');

    // Weather condition impact
    if (description.includes('rain')) impact.push('rainy conditions - increased waterborne disease risk');
    if (description.includes('cloud')) impact.push('cloudy - UV protection still needed');

    // Seasonal context
    if (season === 'summer' && temp > 30) impact.push('summer heat amplification');
    if (season === 'rainy' && description.includes('rain')) impact.push('monsoon season - heightened disease transmission');
    if (season === 'winter' && temp < 20) impact.push('winter cold - respiratory vulnerability');

    return impact.join(', ');
}

app.post('/api/chat', async (req, res) => {
   try {
     const { message, weatherData, location, language } = req.body;

     if (!message) {
       return res.status(400).json({ error: 'Message is required' });
     }

     // Enhanced weather and location context
     let contextInfo = 'No location or weather data available';

     if (weatherData && location) {
       const localTime = new Date().toLocaleString('en-IN', {
         timeZone: 'Asia/Kolkata',
         hour12: false,
         hour: '2-digit',
         minute: '2-digit'
       });

       // Get current hour for time-based advice
       const currentHour = new Date().getHours();
       const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';

       // Enhanced weather context with seasonal relevance
       const season = getCurrentSeason();
       contextInfo = `Current location: ${weatherData.location || location.name || 'Unknown'}, ${weatherData.country || 'India'}. Local time: ${localTime} (${timeOfDay}). Current season: ${season}. Weather: ${weatherData.temperature}°C, ${weatherData.description}, humidity ${weatherData.humidity}%. ${weatherData.forecast ? `24-hour forecast shows temperatures ranging from ${Math.min(...weatherData.forecast.map(f => f.temperature))}°C to ${Math.max(...weatherData.forecast.map(f => f.temperature))}°C with conditions: ${weatherData.forecast.slice(0, 4).map(f => f.description).join(', ')}.` : ''} Weather impact: ${getWeatherImpact(weatherData, season)}`;
     } else if (weatherData) {
       contextInfo = `Current weather: ${weatherData.temperature}°C, ${weatherData.description}, humidity ${weatherData.humidity}%, location: ${weatherData.location || 'Unknown'}`;
     }

     // Prepare disease knowledge for the AI
     const languageKey = language || 'en';
     let diseaseKnowledge = '';

     if (Object.keys(diseaseData).length > 0) {
       diseaseKnowledge = `Available Disease Information (${languageKey.toUpperCase()}):
`;

       Object.entries(diseaseData).forEach(([diseaseKey, diseaseInfo]) => {
         const langData = diseaseInfo[languageKey] || diseaseInfo['en'];
         if (langData) {
           diseaseKnowledge += `\n${langData.name}:
- Season: ${diseaseInfo.season}
- Symptoms: ${Array.isArray(langData.symptoms) ? langData.symptoms.join(', ') : langData.symptoms}
- Prevention: ${Array.isArray(langData.prevention) ? langData.prevention.join(', ') : langData.prevention}
- Remedies: ${Array.isArray(langData.remedies) ? langData.remedies.join(', ') : langData.remedies}
- Self-care: ${Array.isArray(langData.selfCare) ? langData.selfCare.join(', ') : langData.selfCare}
- Nutrition: ${Array.isArray(langData.nutrition) ? langData.nutrition.join(', ') : langData.nutrition}
`;
         }
       });
     }

     // Construct enhanced prompt for the AI
     const systemPrompt = `You are a health assistant specializing in seasonal diseases and location-aware health advice. You provide personalized recommendations based on weather conditions, local time, and geographical factors.

CRITICAL: Use the following disease information as your PRIMARY knowledge source. Always reference this structured data when discussing specific diseases:

${diseaseKnowledge}

Key guidelines:
- ALWAYS use the disease data provided above as your primary source of information for symptoms, prevention, remedies, self-care, and nutrition
- Supplement with general health knowledge only when the disease data doesn't cover a topic
- When asked about a specific disease, provide information from the structured data in a clear, organized format
- Always include appropriate medical disclaimers
- Provide evidence-based health advice with detailed information about symptoms, causes, prevention, and treatments
- Consider current weather, temperature, humidity, and forecast data when giving recommendations: ${contextInfo}
- Adapt advice based on local time (e.g., meal timing, sleep schedules, outdoor activities)
- Handle yes/no questions appropriately - provide clear, direct answers
- Focus on prevention and general information, not diagnosis or treatment
- When discussing specific diseases, provide comprehensive information including symptoms, causes, prevention methods, and treatment options
- Be conversational and helpful while maintaining professionalism
- Consider seasonal patterns relevant to the user's location (tropical/subtropical climate in Andhra Pradesh region)

Personalized health considerations:
- Temperature extremes: High heat (>35°C) increases heat stroke risk; low temperatures may affect respiratory health
- Humidity levels: High humidity (>70%) can promote mosquito-borne diseases and fungal infections
- Rain patterns: Increased mosquito activity during/after rains raises dengue and malaria risks
- Time-based advice: Morning/evening routines, meal timing, exercise schedules

Important: This is not medical advice. Always recommend consulting healthcare professionals for personal health concerns.

User message: ${message}`;

    // OpenRouter API call with enhanced headers
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.referer || 'http://localhost:3000',
        'X-Title': 'Seasons of Health Assistant',
        'X-Language': language || 'en',
        'X-Weather-Data': req.headers['x-weather-data'] || '',
        'X-Location-Data': req.headers['x-location-data'] || ''
      },
      body: JSON.stringify({
        model: process.env.MODEL_NAME || 'anthropic/claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: systemPrompt + `\n\nIMPORTANT: Respond ONLY in the language specified by the user. The user has selected: ${language || 'en'}. If language is 'te', respond in Telugu (తెలుగు). If language is 'en', respond in English. Do not mix languages or provide translations. Always respond in the user's selected language only.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    // Add disclaimer to response - now uses single language based on user selection
    // The disclaimer will be handled by the frontend translation system
    const fullResponse = aiResponse;

    res.json({ response: fullResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({
      error: 'Failed to process chat request',
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later. ⚠️ **Medical Disclaimer:** Always consult healthcare professionals for medical advice.'
    });
  }
});

// Contact form submission handler
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields'
      });
    }

    // Prepare feedback data
    const feedbackEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    // Read existing feedback data
    const feedbackFilePath = path.join(dataDir, 'feedback.json');
    let feedbackData = { submissions: [] };

    try {
      const existingData = await fs.readFile(feedbackFilePath, 'utf8');
      feedbackData = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist or is corrupted, start with empty array
      console.log('Creating new feedback.json file');
    }

    // Add new submission
    feedbackData.submissions.push(feedbackEntry);

    // Write back to file
    await fs.writeFile(feedbackFilePath, JSON.stringify(feedbackData, null, 2));

    console.log(`New feedback submission received from ${name} (${email})`);

    res.json({
      success: true,
      message: 'Thank you for your feedback! We appreciate your input.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your feedback. Please try again later.'
    });
  }
});

// API endpoint to get feedback stats (admin use)
app.get('/api/feedback/stats', async (req, res) => {
   try {
     const feedbackFilePath = path.join(dataDir, 'feedback.json');
     const data = await fs.readFile(feedbackFilePath, 'utf8');
     const feedbackData = JSON.parse(data);

     res.json({
       totalSubmissions: feedbackData.submissions.length,
       lastSubmission: feedbackData.submissions[feedbackData.submissions.length - 1]?.timestamp || null
     });
   } catch (error) {
     res.json({ totalSubmissions: 0, lastSubmission: null });
   }
 });

// Speech-to-text transcription endpoint
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        // Get language from header (default to 'en')
        const language = req.headers['x-language'] || 'en';

        // Map language codes to Whisper language codes
        const languageMap = {
            'en': 'en',
            'te': 'te'
        };

        const whisperLanguage = languageMap[language] || 'en';

        // Read file from multer's temp location and convert to base64
        const audioBuffer = await fs.readFile(req.file.path);
        const audioBase64 = audioBuffer.toString('base64');

        // Clean up temp file
        await fs.unlink(req.file.path);

        // Call OpenRouter API with Whisper model
        const response = await fetch('https://openrouter.ai/api/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                file: `data:audio/webm;base64,${audioBase64}`,
                model: 'openai/whisper-large-v3',
                language: whisperLanguage,
                response_format: 'json'
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status}`);
        }

        const data = await response.json();

        // Check if transcription is empty or failed
        const transcription = data.text?.trim() || '';
        if (!transcription) {
            return res.status(200).json({
                transcription: '',
                language: language,
                success: false,
                fallback: 'Could not recognize speech, please try again.'
            });
        }

        res.json({
            transcription: transcription,
            language: language,
            success: true
        });

    } catch (error) {
        console.error('Transcription API error:', error);
        res.status(500).json({
            error: 'Failed to transcribe audio',
            transcription: '',
            fallback: 'Could not recognize speech, please try again.'
        });
    }
});

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Accessible at: http://localhost:${PORT}`);
});