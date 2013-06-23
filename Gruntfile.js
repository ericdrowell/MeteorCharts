module.exports = function(grunt) {
  var sourceFiles = [
    // core
    'src/Meteor.js', 
    'src/Chart.js', 
    'src/Util.js',

    // units
    'src/units/Number.js', 
    'src/units/Timestamp.js', 
    'src/units/Foot.js', 
    'src/units/Meter.js', 
    'src/units/Seconds.js', 

    // components
    'src/components/Legend.js', 
    'src/components/Title.js', 
    'src/components/VerticalSlider.js', 
    'src/components/XAxis.js', 
    'src/components/YAxis.js', 

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