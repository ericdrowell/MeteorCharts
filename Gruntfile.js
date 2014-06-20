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
    'src/themes/CherryCheescake.js',
    'src/themes/CoteAzur.js',
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
      examples: {
        options: {
          variables: {
            LINE_SERIES_DATA: grunt.file.read('examples/data/line-series-data.json'),
            BAR_SERIES_DATA: grunt.file.read('examples/data/bar-series-data.json'),
            BAR_SERIES_DUAL_DATA: grunt.file.read('examples/data/bar-series-dual-data.json')
          },
          prefix: '@@'
        },

        files: [{
          expand: true, flatten: true,
          src: ['examples/src/*.js'],
          dest: 'examples/dist/'
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
        files: ['src/**/*.js'],
        tasks: ['dev'],
        options: {
          spawn: false,
        },
      }
    },
    copy: {
      examples: {
        flatten: true,
        expand: true,
        src: ['examples/src/*'],
        dest: 'examples/dist/',
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
  grunt.registerTask('examples', ['clean:examples', 'copy:examples:', 'replace:examples']);
  grunt.registerTask('full', ['clean:dist', 'concat:prodSrc', 'uglify', 'concat:prodSrcLicense', 'concat:prodMinLicense', 'replace:prodSrcLicense', 'replace:prodMinLicense']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('devtest', ['dev', 'test']);

};