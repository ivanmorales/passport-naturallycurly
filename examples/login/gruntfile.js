"use strict"

module.exports = function(grunt){
  var watchFiles = {
    serverViews: ['views/**/*.*', 'app.js'],
    ncJS: ['node_modules/passport-naturallycurly/**/*.js'],
  }
  grunt.initConfig({
    watch: {
      serverViews: {
        files: watchFiles.serverViews,
        options: {
          livereload: true
        }
      },
      ncJS: {
        files: watchFiles.ncJS,
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: watchFiles.serverViews.concat(watchFiles.ncJS)
        }
      }
    },
    concurrent: {
      default: ['nodemon:dev', 'watch']
    }
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', ['nodemon'])
}