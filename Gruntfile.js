module.exports = function(grunt) {
  var sourceFiles = [
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

    // formatters
    'src/formatters/Date.js',
    'src/formatters/Number.js'
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

  // Tasks
  grunt.registerTask('dev', ['clean', 'concat:dev', 'replace:dev']);
  grunt.registerTask('full', ['clean', 'concat:prod', 'replace:prod', 'uglify']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('devtest', ['dev', 'test']);

};