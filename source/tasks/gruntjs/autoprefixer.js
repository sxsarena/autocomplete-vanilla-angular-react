module.exports = function(grunt, options){

  var projectDir = options.projectDir;

  return {
	  site: {
      files: [{
        options: {
            browsers: ['last 20 version', 'ie 7', 'ie 8', 'ie 9']
        },
        expand: true,
        cwd : '<%= projectDir %>/css/',
        src : ['*.css'],
        dest: '<%= projectDir %>/css/'
      }]
    }
  };
};
