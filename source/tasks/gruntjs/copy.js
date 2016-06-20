module.exports = function(grunt, options){

  var projectDev = options.projectDev;
  var projectDir = options.projectDir;
  var projectRoot = options.projectRoot;

  return {
    archives : {
      files: [{
        dot: true,
        expand: true,
        cwd   : '<%= projectDev %>/archives/',
        src   : '{,*/,**/}*',
        dest  : '<%= projectDir %>/api/'
      }]
    }
  };
};
