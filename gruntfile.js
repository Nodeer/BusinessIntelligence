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
              './tests/**/*.spec.js'
        ],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          angular: true
        }
      }
    },
    protractor: {
        options: {
          keepAlive: true, // If false, the grunt process stops when the test fails.
          noColor: false // If true, protractor will not use colors in its output.
        },
        tests_e2e: {
          options: {
            configFile: "tests.e2e.js", // Target-specific config file
            args: {} // Target-specific arguments
          }
        },
      }
  });
  
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');
  
  grunt.registerTask('default', ['jshint'] );

};