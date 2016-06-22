module.exports = function(grunt, options){

	var projectDir = options.projectDir;

	return {
    site: {
  		src: [
  			'<%= projectDir %>/{,*/,**/, **/*}'
  		]
    }
	};
};
