module.exports = function(grunt) {
  var sourceFiles = [
    // top level
    'src/MeteorCharts.js',

    // lib
    'lib/date.js',

    // core
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
      dev: {
        src: sourceFiles,
        dest: 'dist/meteorcharts-dev.js'
      },
      prod: {
        src: sourceFiles,
        dest: 'dist/meteorcharts-v<%= pkg.version %>.js'
      },
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
    },
    replace: {
      dev: {
        options: {
          variables: {
            version: 'dev',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/meteorcharts-dev.js'],
          dest: 'dist/meteorcharts-dev.js'
        }]
      },
      prod: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/meteorcharts-v<%= pkg.version %>.js'],
          dest: 'dist/meteorcharts-v<%= pkg.version %>.js'
        }]
      }
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
  grunt.registerTask('dev', ['clean', 'concat:dev', 'replace:dev']);
  grunt.registerTask('full', ['clean', 'concat:prod', 'replace:prod', 'uglify']);

};