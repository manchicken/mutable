'use strict'

module.exports = ( grunt ) => {
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
    }    
  })
}