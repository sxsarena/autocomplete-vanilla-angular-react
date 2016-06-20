module.exports = function(grunt, options){

  var projectDev = options.projectDev;
  var projectDir = options.projectDir;

  return {
    options: {
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
