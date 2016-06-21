module.exports = function(grunt, options){

  var projectDev = options.projectDev;
  var projectDir = options.projectDir;

  return {
    options: {
      transform: [["babelify", { "presets": ["es2015"] }]]
    },
    site: {
      files: {
        '<%= projectDir %>/js/script.min.js':
        [
        '<%= projectDev %>/js/main.js',
        ]
      }
    }
  };
};
