module.exports = function(grunt, options){

  var projectDev = options.projectDev;
  var projectDir = options.projectDir;

  return {
    fonts : {
      files: [{
        expand: true,
        cwd   : '<%= projectDev %>/fonts/',
        src   : '{,*/,**/}*.{otf,eot,svg,ttf,woff,woff2}',
        dest  : '<%= projectDir %>/css/fonts/'
      }]
    }
  };
};
