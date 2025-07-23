module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    files: [
      { pattern: './src/polyfills.ts', watched: false }
    ],
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' }, 
        { type: 'text-summary' },
        { type: 'lcov' },
        { type: 'text' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    browsers: ['Chrome'],
    restartOnFileChange: true
  });
};
