module.exports = function(grunt) {
  var allSourceFiles = [
    // core
    'src/Chart.js',
    'src/Util.js',
    'src/Component.js',
    'src/Formatter.js',

    // components
    'src/components/Line.js',
    'src/components/Axis.js',
    'src/components/Title.js',
    'src/components/Tooltip.js',
    'src/components/GridLines.js',

    // themes
    'src/themes/CherryCheescake.js',
    'src/themes/CoteAzur.js',
    'src/themes/Firenze.js',
    'src/themes/HiCharts.js',
    'src/themes/LinkedIn.js',
    'src/themes/Lollapalooza.js',

    // layouts
    'src/layouts/SparkChart.js',
    'src/layouts/StandardLineChart.js',
    'src/layouts/StandardLineChartWithGrid.js',
    'src/layouts/StandardLineChartWithHorizontalLines.js',
    'src/layouts/StandardLineChartWithTitle.js',

    // interactions
    'src/interactions/LineChartTooltip.js',

    // formatters
    'src/formatters/Date.js',
    'src/formatters/Number.js'
  ];

  var coreSourceFiles = [
    // core
    'src/Chart.js',
    'src/Util.js',
    'src/Component.js',
    'src/Formatter.js'
  ];

  // Project configuration.
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dev: {
        src: allSourceFiles,
        dest: 'dist/meteorcharts-dev.js'
      },
      prod: {
        src: allSourceFiles,
        dest: 'dist/meteorcharts-v<%= pkg.version %>.js'
      },
      core: {
        src: coreSourceFiles,
        dest: 'dist/meteorcharts-core-v<%= pkg.version %>.js'
      },
    },
    uglify: {
      build: {
        files: {
          'dist/meteorcharts-v<%= pkg.version %>.min.js': 'dist/meteorcharts-v<%= pkg.version %>.js',
          'dist/meteorcharts-core-v<%= pkg.version %>.min.js': 'dist/meteorcharts-core-v<%= pkg.version %>.js'
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
      },
      core: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/meteorcharts-core-v<%= pkg.version %>.js'],
          dest: 'dist/meteorcharts-core-v<%= pkg.version %>.js'
        }]
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'tdd',
        reporter: 'spec'
      },

      all: { src: ['test/**/*.js'] }
    },
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['dev'],
        options: {
          spawn: false,
        },
      },
    }
    /*
    shell: {
      test: {
        command: 'mocha -u tdd -d -v -R spec test/build/meteorcharts-test.js',
        options: {
          callback: function(err, stdout, stderr, cb) {
            console.log(stdout);
            cb();
          }
        }
      }
    }*/
  };

  grunt.initConfig(config);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('dev', ['clean', 'concat:dev', 'replace:dev']);
  grunt.registerTask('full', ['clean', 'concat:prod', 'concat:core', 'replace:prod', 'replace:core', 'uglify']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('devtest', ['dev', 'test']);

};