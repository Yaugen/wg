module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js', 'templates/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['js/*.js', 'templates/*.html', 'less/*.less'],
      tasks: ['nunjucks', 'concat', 'less']
    },
    nunjucks: {
      precompile: {
        baseDir: 'templates',
        src: 'templates/*',
        dest: 'templates/templates.js'
      }
    },
    less: {
      development: {
        files: {
          "css/style.css": "less/main.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nunjucks');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};