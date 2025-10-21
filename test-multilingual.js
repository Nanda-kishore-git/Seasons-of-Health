const puppeteer = require('puppeteer');

async function testMultilingualSite() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const results = {
    pagesLoaded: [],
    languageSwitching: false,
    aiAssistant: false,
    horizontalScroll: false,
    weatherUpdates: false,
    healthCenters: false,
    formsFunctional: false,
    noConsoleErrors: true,
    responsiveDesign: false,
    apiIntegrations: false,
    consoleErrors: []
  };

  try {
    // Test page loading
    const pages = [
      'http://localhost:3000/public/index.html',
      'http://localhost:3000/public/contact.html',
      'http://localhost:3000/public/diseases.html',
      'http://localhost:3000/public/selfcare.html',
      'http://localhost:3000/public/healthcenters.html',
      'http://localhost:3000/public/assistant.html'
    ];

    for (const url of pages) {
      const response = await page.goto(url, { waitUntil: 'networkidle0' });
      if (response.ok()) {
        results.pagesLoaded.push(url);
      }
    }

    // Test language switching
    await page.goto('http://localhost:3000/public/index.html');
    await page.waitForSelector('#languageSelect', { timeout: 5000 });
    const languageOptions = await page.$eval('#languageSelect option', options => options.map(o => o.value));
    if (languageOptions.includes('te')) {
      await page.select('#languageSelect', 'te');
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Check if language changed by looking at translated text
      const titleText = await page.$eval('[data-i18n="home.title"]', el => el.textContent);
      if (titleText && titleText !== 'Seasons of Health') {
        results.languageSwitching = true;
      }
    }

    // Test AI Assistant
    await page.goto('http://localhost:3000/public/assistant.html');
    await page.waitForSelector('#chatInput', { timeout: 5000 });
    const chatInput = await page.$('#chatInput');
    if (chatInput) {
      await chatInput.type('Hello');
      await page.keyboard.press('Enter');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const messages = await page.$$eval('.message', msgs => msgs.length);
      if (messages > 1) { // At least greeting + user message
        results.aiAssistant = true;
      }
    }

    // Test horizontal scroll on mobile
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000/public/index.html');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const scrollable = await page.evaluate(() => {
      const body = document.body;
      return body.scrollWidth > body.clientWidth;
    });
    results.horizontalScroll = scrollable;

    // Test weather functionality
    await page.goto('http://localhost:3000/public/index.html');
    await page.waitForSelector('.weather-info', { timeout: 10000 });
    const weatherTemp = await page.$eval('.weather-temp', el => el.textContent.trim());
    if (weatherTemp && weatherTemp !== '--°C') {
      results.weatherUpdates = true;
    }

    // Test health centers
    await page.goto('http://localhost:3000/public/healthcenters.html');
    await page.waitForSelector('#healthCentersMap', { timeout: 10000 });
    const mapExists = await page.$('#healthCentersMap') !== null;
    const categoriesExist = await page.$$eval('.category-btn', btns => btns.length > 0);
    results.healthCenters = mapExists && categoriesExist;

    // Test forms
    await page.goto('http://localhost:3000/public/contact.html');
    await page.waitForSelector('form', { timeout: 5000 });
    const formExists = await page.$('form') !== null;
    if (formExists) {
      const inputs = await page.$$eval('input, textarea', els => els.length);
      const buttons = await page.$$eval('button[type="submit"]', btns => btns.length);
      results.formsFunctional = inputs > 0 && buttons > 0;
    }

    // Test responsiveness
    const breakpoints = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }  // Desktop
    ];

    for (const bp of breakpoints) {
      await page.setViewport(bp);
      await page.goto('http://localhost:3000/public/index.html');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const isVisible = await page.evaluate(() => {
        const body = document.body;
        return body.offsetWidth > 0 && body.offsetHeight > 0;
      });
      if (!isVisible) {
        results.responsiveDesign = false;
        break;
      }
    }
    results.responsiveDesign = true;

    // Check for console errors
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('requestfailed', req => errors.push(`Request failed: ${req.url()}`));

    // Revisit pages to catch errors
    for (const url of pages) {
      await page.goto(url, { waitUntil: 'networkidle0' });
    }

    if (errors.length > 0) {
      results.noConsoleErrors = false;
      results.consoleErrors = errors;
    }

    // Test API integrations (weather and health centers APIs)
    await page.goto('http://localhost:3000/public/index.html');
    const weatherApiCalls = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(r => r.name.includes('api.openweathermap.org') || r.name.includes('weather'))
        .length;
    });

    await page.goto('http://localhost:3000/public/healthcenters.html');
    const healthApiCalls = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(r => r.name.includes('api') || r.name.includes('data'))
        .length;
    });

    results.apiIntegrations = weatherApiCalls > 0 || healthApiCalls > 0;

  } catch (error) {
    console.error('Test error:', error.message);
    results.consoleErrors.push(error.message);
    results.noConsoleErrors = false;
  } finally {
    await browser.close();
  }

  return results;
}

module.exports = testMultilingualSite;