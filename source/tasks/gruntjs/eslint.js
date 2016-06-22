module.exports = function(grunt, options){

  var projectDev = options.projectDev;

  return {
    options: {
      configFile: './.eslintrc.js'
    },
    site: ['<%= projectDev %>/js/{,*/,**/}*.js']
  };
};
