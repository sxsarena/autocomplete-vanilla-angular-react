module.exports = function(grunt, options){

  var projectDev = options.projectDev;
	var projectDir = options.projectDir;

	return {
    options: {
      run: true,
      reporter: 'Spec'
    },
		site : {
      src: ['<%= projectDev %>/js/tests/testrunner.html']
    }
	};
};
