module.exports = function(grunt, options){

  var projectDev = options.projectDev;

  return {
    options: {
      quiet: true,
      configFile: './.eslintrc.js'
    },
    site: ['<%= projectDev %>/js/{,*/,**/}*.js']
  };
};
