module.exports = function(grunt, options){

  var projectDev = options.projectDev;
  var projectDir = options.projectDir;

  return {
    site: {
      options: {
        livereload: true
      },
      files: [
        '<%= projectDev %>/scss/{,*/, **/, **/**/*,**/*}*.{scss,sass}',
        '<%= projectDev %>/js/{,*/,**/}*.{js, jsx}',
        '<%= projectDir %>/css/{,*/, **/}*.css'
      ],
      tasks: ['dev']
    }
  };
};
