var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      vendor: {
        files: [
          {
            expand: true, cwd: 'bower_components/bootstrap/dist/js/',
            src: ['bootstrap.js'], dest: 'public/js/vendor'
          },
          {
            expand: true, cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/src/js/',
            src: ['*'], dest: 'public/js/vendor'
          },
          {
            expand: true, cwd: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css/',
            src: ['*'], dest: 'public/css/vendor/bootstrap-datetimepicker'
          },
          {
            expand: true, cwd: 'bower_components/moment/min/',
            src: ['moment.min.js'], dest: 'public/js/vendor'
          },
          {
            expand: true, cwd: 'bower_components/bootstrap/',
            src: ['less/**'], dest: 'public/css/vendor/bootstrap/'
          },
          {
            expand: true, cwd: 'bower_components/font-awesome/',
            src: ['less/**'], dest: 'public/css/vendor/font-awesome/'
          },
          {
            expand: true, cwd: 'bower_components/jquery/dist/',
            src: ['jquery.js'], dest: 'public/js/vendor'
          },
          {
            expand: true, cwd: 'bower_components/font-awesome/fonts/',
            src: ['*'], dest: 'public/fonts'
          },
          {
            expand: true, cwd: 'bower_components/bootstrap/fonts/',
            src: ['*'], dest: 'public/fonts'
          },
          {
            expand: true, cwd: 'bower_components/datatables/media/js/',
            src: ['jquery.dataTables.js'], dest: 'public/js/vendor/datatables'
          },
          {
            expand: true, cwd: 'bower_components/datatables/media/css/',
            src: ['jquery.dataTables.css'], dest: 'public/css/vendor/datatables'
          },
          {
            expand: true, cwd: 'bower_components/firebase/',
            src: ['firebase.js'], dest: 'public/js/vendor'
          },
          {
            expand: true, cwd: 'bower_components/lodash/',
            src: ['lodash.js'], dest: 'public/js/vendor'
          },
          {
            expand: true, cwd: 'bower_components/datatables/media/images/',
            src: ['*'], dest: 'public/images'
          },
          {
            expand: true, cwd: 'bower_components/gmaps/',
            src: ['gmaps.js'], dest: 'public/js/vendor'
          }
        ]
      }
    },
    clean: {
      vendor: {
        src: ['public/js/vendor/**', 'public/css/vendor/**']
      }
    },
    concat: {
      dist: {
        files: {
          'public/js/lib/vendor.js': [
            'public/js/vendor/jquery.js',
            'public/js/vendor/jquery-ui.min.js',
            'public/js/lib/google-map.js',
            'public/js/vendor/bootstrap.js',
            'public/js/vendor/moment.min.js',
            'public/js/vendor/gmaps.js',
            'public/js/vendor/bootstrap-datetimepicker.js',
            'public/js/vendor/firebase.js',
            'public/js/vendor/datatables/jquery.dataTables.js',
            'public/js/vendor/lodash.js'
          ]
        }
      }
    },
    curl: {
      'public/js/lib/google-map.js': 'http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places,geometry',
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/css/main.css": "public/css/mixins.less" // destination file and source file
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'public/js/lib/vendor.min.js': ['public/js/lib/vendor.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-curl');

  grunt.registerTask('default', ['curl','copy:vendor', 'concat', 'less', 'uglify']);
};
