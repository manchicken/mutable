'use strict'

module.exports = ( grunt ) => {

  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-jsdoc')
  grunt.loadNpmTasks('grunt-mocha-istanbul')
  grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.initConfig({
   mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false
        },
        src: ['test/**/*.js']
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          // will check both coverage folders and merge the coverage results
          coverageFolder: 'coverage*',
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'bin/**/*.js', 'demo/**/*.js', 'test/**/*.js'],
      options: {
        asi: true,
        devel: true,
        node: true,
        mocha: true,
        esnext: true
      }
    },
    jsdoc : {
      dist : {
        src: [
          'bin/**/*',
          'lib/**/*.js',
          'test/**/*.js'
        ],
        options: {
          destination: 'doc'
        }
      }
    }
  })
  
  grunt.registerTask('test', 'mochaTest')
  grunt.registerTask('coveralls', ['mocha_istanbul:coveralls'])
  grunt.registerTask('coverage', ['mocha_istanbul:coverage'])
}
