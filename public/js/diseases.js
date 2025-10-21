// Module for storing seasonal disease data in English and Telugu
// Data structure: diseases[diseaseName][language][category]
// Categories: symptoms, prevention, remedies, selfCare, nutrition
const diseases = {
  // Summer diseases
  heatstroke: {
    season: 'summer',
    en: {
      name: 'Heatstroke',
      symptoms: ['High body temperature', 'Confusion', 'Rapid heartbeat', 'Loss of consciousness'],
      prevention: ['Stay hydrated', 'Avoid direct sunlight during peak hours', 'Wear light clothing', 'Take frequent breaks in shade'],
      remedies: ['Move to a cool place', 'Drink water slowly', 'Use cold packs on neck and armpits', 'Seek medical help immediately'],
      selfCare: ['Rest in cool environment', 'Monitor body temperature', 'Avoid strenuous activities'],
      nutrition: ['Consume electrolyte-rich drinks', 'Eat light, hydrating foods like watermelon and cucumber', 'Avoid caffeine and alcohol']
    },
    te: {
      name: 'వెచ్చని హిట్ స్ట్రోక్',
      symptoms: ['ఎత్తైన శరీర ఉష్ణోగ్రత', 'గందరగోళం', 'వేగవైన హృదయ గతి', 'చైతన్యం కోల్పోవడం'],
      prevention: ['హైడ్రేటెడ్‌గా ఉండండి', 'పీక్ గంటలలో నేరుగా సూర్యకిరణాలను నివారించండి', 'లైట్ వస్త్రాలు ధరించండి', 'షేడ్‌లో తరచుగా విరామాలు తీసుకోండి'],
      remedies: ['కూల్ ప్రదేశానికి వెళ్లండి', 'నీరు నెమ్మదిగా త్రాగండి', 'మెడ మరియు అర్మ్‌పిట్‌లలో కోల్డ్ ప్యాక్స్ ఉపయోగించండి', 'వెంటనే వైద్య సహాయం కోరండి'],
      selfCare: ['కూల్ వాతావరణంలో విశ్రాంతి తీసుకోండి', 'శరీర ఉష్ణోగ్రతను పరిశీలించండి', 'పటిష్టమైన కార్యకలాపాలను నివారించండి'],
      nutrition: ['ఎలక్ట్రోలైట్-సమృద్ధమైన పానీయాలు సేవించండి', 'వాటర్‌మెలాన్ మరియు క్యూకంబర్ వంటి లైట్, హైడ్రేటింగ్ ఆహారాలు తినండి', 'క్యాఫీన్ మరియు ఆల్కహాల్ ను నివారించండి']
    }
  },
  dehydration: {
    season: 'summer',
    en: {
      name: 'Dehydration',
      symptoms: ['Dry mouth and skin', 'Fatigue', 'Dizziness', 'Dark urine'],
      prevention: ['Drink plenty of water', 'Avoid alcohol and caffeine', 'Eat water-rich foods', 'Limit outdoor activities during heat'],
      remedies: ['Drink oral rehydration solution', 'Rest in cool place', 'Sip water slowly', 'Seek medical attention if severe'],
      selfCare: ['Monitor urine color', 'Weigh yourself daily', 'Avoid overheating'],
      nutrition: ['Consume fruits with high water content', 'Electrolyte supplements', 'Light, watery soups']
    },
    te: {
      name: 'నీటి కొరత',
      symptoms: ['పొడి నోరు మరియు చర్మం', 'అలసట', 'తలతిరిగేలా ఉండటం', 'గట్టి మూత్రం'],
      prevention: ['చాలా నీరు త్రాగండి', 'ఆల్కహాల్ మరియు క్యాఫీన్ ను నివారించండి', 'నీటితో సమృద్ధమైన ఆహారం తినండి', 'వేడిలో బయట కార్యకలాపాలను పరిమితం చేయండి'],
      remedies: ['ఆరల్ రీహైడ్రేషన్ సొల్యూషన్ త్రాగండి', 'కూల్ ప్రదేశంలో విశ్రాంతి తీసుకోండి', 'నీటిని నెమ్మదిగా గ్రసించండి', 'తీవ్రమైతే వైద్య సహాయం కోరండి'],
      selfCare: ['మూత్రం రంగును పరిశీలించండి', 'రోజువారీ మీరు తూచండి', 'అతి వేడికి లోబడకండి'],
      nutrition: ['అధిక నీటి కంటెంట్‌తో పండ్లు సేవించండి', 'ఎలక్ట్రోలైట్ సప్లిమెంట్స్', 'లైట్, వాటరీ సూప్స్']
    }
  },
  // Rainy season diseases
  dengue: {
    season: 'rainy',
    en: {
      name: 'Dengue Fever',
      symptoms: ['High fever', 'Severe headache', 'Joint and muscle pain', 'Skin rash'],
      prevention: ['Use mosquito repellents', 'Wear long-sleeved clothing', 'Eliminate standing water', 'Use mosquito nets'],
      remedies: ['Rest and hydration', 'Paracetamol for fever', 'Seek medical care', 'Avoid aspirin'],
      selfCare: ['Monitor platelet count', 'Stay in air-conditioned rooms', 'Avoid mosquito bites'],
      nutrition: ['Consume plenty of fluids', 'Light, nutritious meals', 'Fruits rich in vitamin C']
    },
    te: {
      name: 'డెంగు జ్వరం',
      symptoms: ['అధిక జ్వరం', 'తీవ్రమైన తలనొప్పి', 'జాయింట్ మరియు మసల్ పెయిన్', 'చర్మం ర్యాష్'],
      prevention: ['మోస్కిటో రిపెలెంట్స్ ఉపయోగించండి', 'లాంగ్-స్లీవ్డ్ వస్త్రాలు ధరించండి', 'నిలిచిన నీటిని తొలగించండి', 'మోస్కిటో నెట్స్ ఉపయోగించండి'],
      remedies: ['విశ్రాంతి మరియు హైడ్రేషన్', 'జ్వరం కోసం ప్యారాసెటమాల్', 'వైద్య సహాయం కోరండి', 'అస్పిరిన్ ను నివారించండి'],
      selfCare: ['ప్లేట్లెట్ కౌంట్ పరిశీలించండి', 'ఎయిర్-కండీషన్డ్ రూమ్స్‌లో ఉండండి', 'మోస్కిటో కటకాలను నివారించండి'],
      nutrition: ['చాలా ద్రవాలు సేవించండి', 'లైట్, న్యూట్రిషస్ మీల్స్', 'విటమిన్ C తో సమృద్ధమైన పండ్లు']
    }
  },
  malaria: {
    season: 'rainy',
    en: {
      name: 'Malaria',
      symptoms: ['Fever with chills', 'Headache', 'Fatigue', 'Nausea'],
      prevention: ['Use mosquito nets', 'Apply insect repellents', 'Take antimalarial medication if prescribed', 'Eliminate mosquito breeding sites'],
      remedies: ['Seek immediate medical treatment', 'Take prescribed antimalarials', 'Rest and hydrate', 'Monitor symptoms'],
      selfCare: ['Use mosquito protection', 'Complete full course of medication', 'Regular health check-ups'],
      nutrition: ['Balanced diet with iron-rich foods', 'Vitamin supplements', 'Hydrating foods and drinks']
    },
    te: {
      name: 'మలేరియా',
      symptoms: ['చిల్‌లతో జ్వరం', 'తలనొప్పి', 'అలసట', 'వాంతి'],
      prevention: ['మోస్కిటో నెట్స్ ఉపయోగించండి', 'ఇన్సెక్ట్ రిపెలెంట్స్ అప్లై చేయండి', 'ప్రిస్క్రైబ్ చేసిన అంటీమలేరియల్ మెడిసిన్ తీసుకోండి', 'మోస్కిటో బ్రీడింగ్ సైట్స్ ను తొలగించండి'],
      remedies: ['వెంటనే వైద్య చికిత్స కోరండి', 'ప్రిస్క్రైబ్ చేసిన అంటీమలేరియల్స్ తీసుకోండి', 'విశ్రాంతి మరియు హైడ్రేట్ చేయండి', 'సింప్టమ్స్ పరిశీలించండి'],
      selfCare: ['మోస్కిటో ప్రోటెక్షన్ ఉపయోగించండి', 'మెడిసిన్ యొక్క పూర్తి కోర్స్ పూర్తి చేయండి', 'రెగ్యులర్ హెల్త్ చెక్-అప్స్'],
      nutrition: ['ఐరన్-సమృద్ధమైన ఆహారాలతో బ్యాలెన్స్డ్ డైట్', 'విటమిన్ సప్లిమెంట్స్', 'హైడ్రేటింగ్ ఆహారాలు మరియు పానీయాలు']
    }
  },
  // Winter diseases
  flu: {
    season: 'winter',
    en: {
      name: 'Seasonal Flu',
      symptoms: ['Fever', 'Cough', 'Sore throat', 'Body aches'],
      prevention: ['Get annual flu vaccine', 'Wash hands frequently', 'Avoid close contact with sick people', 'Cover mouth when coughing'],
      remedies: ['Rest and drink fluids', 'Use pain relievers', 'Use humidifiers', 'Seek medical help if symptoms worsen'],
      selfCare: ['Stay home when sick', 'Use tissues for cough/sneeze', 'Clean surfaces regularly'],
      nutrition: ['Vitamin C rich foods', 'Warm soups and broths', 'Herbal teas']
    },
    te: {
      name: 'సీజనల్ ఫ్లూ',
      symptoms: ['జ్వరం', 'కఫం', 'గొంతు నొప్పి', 'శరీర నొప్పులు'],
      prevention: ['వార్షిక ఫ్లూ వ్యాక్సిన్ తీసుకోండి', 'తరచుగా చేతులు తడిచి ఉంచండి', 'వ్యాధిగ్రస్త వ్యక్తులతో సన్నిహిత సంబంధాన్ని నివారించండి', 'కఫం వచ్చినప్పుడు నోరు కప్పండి'],
      remedies: ['విశ్రాంతి తీసుకోండి మరియు ద్రవాలు త్రాగండి', 'పెయిన్ రిలీవర్స్ ఉపయోగించండి', 'హ్యూమిడిఫైయర్స్ ఉపయోగించండి', 'సింప్టమ్స్ మరింత మందగించినప్పుడు వైద్య సహాయం కోరండి'],
      selfCare: ['వ్యాధిగ్రస్తుడైనప్పుడు ఇంట్లో ఉండండి', 'కఫం/స్నీజ్ కోసం టిష్యూలు ఉపయోగించండి', 'సర్ఫసెస్ రెగ్యులర్‌గా క్లీన్ చేయండి'],
      nutrition: ['విటమిన్ C సమృద్ధమైన ఆహారాలు', 'వార్మ్ సూప్స్ మరియు బ్రోత్స్', 'హెర్బల్ టీలు']
    }
  },
  cold: {
    season: 'winter',
    en: {
      name: 'Common Cold',
      symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Sneezing'],
      prevention: ['Wash hands regularly', 'Avoid touching face', 'Stay away from sick people', 'Boost immune system'],
      remedies: ['Rest and sleep', 'Drink warm fluids', 'Use saline nasal sprays', 'Over-the-counter medications'],
      selfCare: ['Stay warm and dry', 'Use humidifiers', 'Get plenty of rest'],
      nutrition: ['Vitamin C rich foods', 'Warm soups', 'Ginger tea']
    },
    te: {
      name: 'కామన్ కోల్డ్',
      symptoms: ['నీరు నాకం', 'గొంతు నొప్పి', 'కఫం', 'స్నీజింగ్'],
      prevention: ['రెగ్యులర్‌గా చేతులు తడిచి ఉంచండి', 'ముఖాన్ని తాకకండి', 'వ్యాధిగ్రస్త వ్యక్తుల నుండి దూరంగా ఉండండి', 'ఇమ్యూన్ సిస్టమ్ ను బూస్ట్ చేయండి'],
      remedies: ['విశ్రాంతి మరియు నిద్ర', 'వార్మ్ ద్రవాలు త్రాగండి', 'సలైన్ నాసల్ స్ప్రేస్ ఉపయోగించండి', 'ఓవర్-ది-కౌంటర్ మెడిసిన్స్'],
      selfCare: ['వార్మ్ మరియు డ్రైగా ఉండండి', 'హ్యూమిడిఫైయర్స్ ఉపయోగించండి', 'చాలా విశ్రాంతి తీసుకోండి'],
      nutrition: ['విటమిన్ C సమృద్ధమైన ఆహారాలు', 'వార్మ్ సూప్స్', 'జింజర్ టీ']
    }
  }
};

// Get current language from language manager
function getCurrentLanguage() {
   return languageManager ? languageManager.getCurrentLanguage() : 'en';
}

// Export functions for accessing data
export function getDiseaseData(diseaseName, language) {
   if (!diseases[diseaseName]) {
      return null;
   }
   const currentLang = language || getCurrentLanguage();
   return diseases[diseaseName][currentLang] || diseases[diseaseName]['en'];
}

export function getDiseasesBySeason(season, language) {
   const currentLang = language || getCurrentLanguage();
   return Object.keys(diseases)
      .filter(disease => diseases[disease].season === season)
      .map(disease => ({
         name: diseases[disease][currentLang]?.name || diseases[disease]['en'].name,
         ...diseases[disease][currentLang] || diseases[disease]['en']
      }));
}

export function getAllDiseases(language) {
   const currentLang = language || getCurrentLanguage();
   return Object.keys(diseases).map(disease => ({
      name: diseases[disease][currentLang]?.name || diseases[disease]['en'].name,
      ...diseases[disease][currentLang] || diseases[disease]['en']
   }));
}

export function addDisease(diseaseName, season, data) {
  if (!diseases[diseaseName]) {
    diseases[diseaseName] = { season };
  }
  Object.keys(data).forEach(lang => {
    if (!diseases[diseaseName][lang]) {
      diseases[diseaseName][lang] = {};
    }
    Object.assign(diseases[diseaseName][lang], data[lang]);
  });
}

// Make module available globally if not using ES6 modules
if (typeof window !== 'undefined') {
  window.DiseaseData = {
    getDiseaseData,
    getDiseasesBySeason,
    getAllDiseases,
    addDisease
  };
}