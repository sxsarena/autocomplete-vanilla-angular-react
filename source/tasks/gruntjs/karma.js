module.exports = function(grunt, options){

  var continuousIntegrationMode = grunt.option('ci') || false;

  return {
    test: {
      configFile: './karma.conf.js',
      singleRun: continuousIntegrationMode,
      reporters: continuousIntegrationMode ? ['teamcity'] : ['progress']
    }
  };

};
