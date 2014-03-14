exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000',
    specs: [
        './**/e2e/**/*.spec.js']
};