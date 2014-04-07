module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js',
			  './public/**/app.js',
			  './public/**/controllers.js',
			  './public/**/services.js',
			  './models/**/*.js',
			  './repository/**/*.js',
			  './routes/**/*.js',
			  './services/**/*.js',
			  './tests/**/*.spec.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('default', ['jshint']);

};