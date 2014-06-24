module.exports = function(grunt) {
  var allSourceFiles = [
    // core
    'src/Chart.js',
    'src/Util.js',
    'src/DOM.js',
    'src/SVG.js',
    'src/Event.js',
    'src/Component.js',
    'src/Renderer.js',
    'src/Mutator.js',

    // components
    'src/components/LineSeries.js',
    'src/components/Axis.js',
    'src/components/Title.js',
    'src/components/Tooltip.js',
    'src/components/GridLines.js',
    'src/components/Slider.js',
    'src/components/Legend.js',
    'src/components/BarSeries.js',

    // themes
    'src/themes/BeachsideShopping.js',
    'src/themes/CherryCheescake.js',
    'src/themes/CoteAzur.js',
    'src/themes/Dribble.js',
    'src/themes/Firenze.js',
    'src/themes/Lollapalooza.js',
    
    // layouts
    'src/layouts/L1_A.js',
    'src/layouts/L4_A.js',
    'src/layouts/L4_B.js',
    'src/layouts/L4_C.js',
    'src/layouts/L4_D.js',

    // formatters
    'src/formatters/Date.js',
    'src/formatters/Number.js',
    'src/formatters/String.js'
  ];

  var coreSourceFiles = [
    // core
    'src/Chart.js',
    'src/Util.js',
    'src/Component.js',
    'src/Formatter.js'
  ];

  var allChartFiles = [
    'examples/src/charts.js',

    // data
    'examples/data/line-series-data.js',
    'examples/data/bar-series-data.js',
    'examples/data/bar-dual-series-data.js',

    // line charts
    'examples/src/line-chart.js',
    'examples/src/line-spark-chart.js',
    'examples/src/line-chart-with-top-legend.js',
    'examples/src/line-chart-with-right-legend.js',
    'examples/src/line-chart-with-title.js',
    'examples/src/line-chart-with-grid.js',
    'examples/src/line-chart-with-horizontal-lines.js',
    'examples/src/line-chart-with-vertical-lines.js',
    'examples/src/line-chart-with-bottom-slider.js',

    // bar charts
    'examples/src/bar-chart.js',
    'examples/src/bar-spark-chart.js',
    'examples/src/bar-dual-chart.js',
    'examples/src/bar-chart-with-top-legend.js',
    'examples/src/bar-chart-with-right-legend.js'
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
      prodSrc: {
        src: allSourceFiles,
        dest: 'dist/meteorcharts-v<%= pkg.version %>.js'
      },
      dev2: {
        src: ['license.js', 'dist/meteorcharts-dev.js'],
        dest: 'dist/meteorcharts-dev.js'
      },
      prodSrcLicense: {
        src: ['license.js', 'dist/meteorcharts-v<%= pkg.version %>.js'],
        dest: 'dist/meteorcharts-v<%= pkg.version %>.js'
      },
      prodMinLicense: {
        src: ['license.js', 'dist/meteorcharts-v<%= pkg.version %>.min.js'],
        dest: 'dist/meteorcharts-v<%= pkg.version %>.min.js'
      },
      examples: {
        src: allChartFiles,
        dest: 'examples/dist/all-charts.js'
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
      dist: ['dist/*'],
      examples: ['examples/dist/*']
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
      prodSrcLicense: {
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
      prodMinLicense: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/meteorcharts-v<%= pkg.version %>.min.js'],
          dest: 'dist/meteorcharts-v<%= pkg.version %>.min.js'
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
      src: {
        files: ['src/**/*.js', 'examples/**/*.js'],
        tasks: ['dev', 'examples'],
        options: {
          spawn: false,
        },
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
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Tasks
  grunt.registerTask('dev', ['clean:dist', 'concat:dev', 'concat:dev2', 'replace:dev']);
  grunt.registerTask('examples', ['clean:examples', 'concat:examples']);
  grunt.registerTask('full', ['clean:dist', 'concat:prodSrc', 'uglify', 'concat:prodSrcLicense', 'concat:prodMinLicense', 'replace:prodSrcLicense', 'replace:prodMinLicense']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('devtest', ['dev', 'test']);

};