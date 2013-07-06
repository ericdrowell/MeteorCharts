module.exports = function(grunt) {
  var sourceFiles = [
    // lib
    'lib/date.js',

    // core
    'src/Meteor.js', 
    'src/Chart.js', 
    'src/Util.js',
    'src/Unit.js',

    // units
    'src/units/Numbers.js', 
    'src/units/Timestamp.js', 
    'src/units/Feet.js', 
    'src/units/Meters.js', 
    'src/units/Seconds.js', 

    // components
    'src/components/Legend.js', 
    'src/components/Title.js', 
    'src/components/XAxis.js', 
    'src/components/YAxis.js', 
    'src/components/Tooltip.js',
    'src/components/Zoom.js',

    // charts
    'src/charts/Line.js'
  ];

  // Project configuration.
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      source: {
        src: sourceFiles,
        dest: 'dist/meteorcharts-v<%= pkg.version %>.js'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/meteorcharts-v<%= pkg.version %>.min.js': 'dist/meteorcharts-v<%= pkg.version %>.js'
        }
      }
    },
    clean: {
      build: ['dist/*']
    },
    jshint: {
      options: {
        laxbreak: true
      },
      all: ['src/**/*.js']
    }
  };

  grunt.initConfig(config);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Tasks
  grunt.registerTask('dev', ['clean', 'concat:source']);
  grunt.registerTask('full', ['dev', 'uglify']);

};