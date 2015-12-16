/*
 * grunt-google-closure-compiler
 * https://github.com/ShrimpDev/grunt-google-closure-compiler
 *
 * Copyright (c) 2015 CSoellinger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    // Configuration to be run (and then tested).
    google_closure_compiler: {
      default_options: {
        options: {
        },
        files: {
          'tmp/main_default.js': ['test/fixtures/main_default.js', 'test/fixtures/main_default_second.js'],
          'tmp/main_default_second.js': ['test/fixtures/main_default.js', 'test/fixtures/main_default_second.js'],
          'tmp/main_default_third.js': ['test/fixtures/*'],
          'tmp/main_default_fourth.js': ['test/fixtures/**']
        }
      },
      custom_options: {
        options: {
          java_tieredcompilation: false
        },
        files: {
          'tmp/main_custom.js': ['test/fixtures/main_custom.js', 'test/fixtures/main_custom_second.js']
        }
      }
    },
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'google_closure_compiler:default_options', 'google_closure_compiler:custom_options', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
