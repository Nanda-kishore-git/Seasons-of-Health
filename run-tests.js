const testMultilingualSite = require('./test-multilingual');

async function runAllTests() {
  console.log('🚀 Starting comprehensive multilingual site tests...\n');

  try {
    const results = await testMultilingualSite();

    console.log('📊 Test Results:\n');

    console.log('✅ Page Loading:');
    results.pagesLoaded.forEach(url => console.log(`  - ${url}: OK`));
    if (results.pagesLoaded.length < 6) {
      console.log('  ❌ Some pages failed to load');
    }

    console.log('\n🌍 Language Switching:', results.languageSwitching ? '✅ PASS' : '❌ FAIL');
    console.log('🤖 AI Assistant:', results.aiAssistant ? '✅ PASS' : '❌ FAIL');
    console.log('📱 Horizontal Scroll (Mobile):', results.horizontalScroll ? '✅ PASS' : '❌ FAIL');
    console.log('🌤️ Weather Updates:', results.weatherUpdates ? '✅ PASS' : '❌ FAIL');
    console.log('🏥 Health Centers:', results.healthCenters ? '✅ PASS' : '❌ FAIL');
    console.log('📝 Forms Functionality:', results.formsFunctional ? '✅ PASS' : '❌ FAIL');
    console.log('🖥️ Responsive Design:', results.responsiveDesign ? '✅ PASS' : '❌ FAIL');
    console.log('🔗 API Integrations:', results.apiIntegrations ? '✅ PASS' : '❌ FAIL');

    console.log('\n🐛 Console Errors:', results.noConsoleErrors ? '✅ None' : '❌ Found');
    if (!results.noConsoleErrors) {
      results.consoleErrors.forEach(error => console.log(`  - ${error}`));
    }

    const totalTests = 9;
    const passedTests = [
      results.pagesLoaded.length === 6,
      results.languageSwitching,
      results.aiAssistant,
      results.horizontalScroll,
      results.weatherUpdates,
      results.healthCenters,
      results.formsFunctional,
      results.responsiveDesign,
      results.apiIntegrations
    ].filter(Boolean).length;

    console.log(`\n📈 Overall Score: ${passedTests}/${totalTests} tests passed`);

    if (passedTests === totalTests) {
      console.log('🎉 All tests passed! Site is ready for deployment.');
    } else {
      console.log('⚠️ Some tests failed. Please review and fix issues before deployment.');
    }

    return results;

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    return null;
  }
}

runAllTests();