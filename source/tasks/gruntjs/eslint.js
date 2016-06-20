module.exports = function(grunt, options){

  var projectDev = options.projectDev;

  return {
    options: {
      configFile: '../../../.eslintrc'
    },
    site: ['<%= projectDev %>/js/{,*/,**/}*.js']
  };
};
