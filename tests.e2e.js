exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000',
    specs: [
        './**/e2e/**/user.spec.js',
        './**/e2e/**/administrator.spec.js',
        './**/e2e/**/businessanalyst.spec.js'
    ]
};