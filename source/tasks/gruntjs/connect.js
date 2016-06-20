module.exports = function(grunt, options){

  var projectDir = options.projectDir;

  return {
    server: {
      options: {
        port: 8000,
        hostname: 'localhost',
        base: './public',
        open: true,
        livereload: true
      }
    }
  };

};
