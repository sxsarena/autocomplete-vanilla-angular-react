module.exports = function(config, options){

  config.set({
    basePath:  '',
    frameworks: ['browserify', 'mocha', 'chai'],
    files: [
      './source/assets/js/tests/*.js'
    ],
    preprocessors: {
      './source/assets/js/tests/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [['babelify', {presets: ['es2015']}]]
    },
    exclude: [
    ],
    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['mocha'],

    plugins: [
      "karma-browserify",
      "karma-chai",
      "karma-mocha",
      "karma-phantomjs-launcher",
      'karma-mocha-reporter'
    ],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
