module.exports = function(grunt, options){

  var projectDev = options.projectDev;
	var projectDir = options.projectDir;

	return {
		site : {
      options: {
        source: '<%= projectDev %>/js',
        destination: '<%= projectDir %>/doc'
      }
    }
	};
};
