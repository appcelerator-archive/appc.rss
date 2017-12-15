module.exports = function (grunt) {
	// Project configuration.
  grunt.initConfig({
    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          timeout: 30000,
          ignoreLeaks: false,
          check: {
            statements: 90,
            branches: 90,
            functions: 90,
            lines: 90
          }
        }
      }
    },
    clean: ['tmp']
  })

	// Load grunt plugins for modules.
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-clean')

	// Register tasks.
  grunt.registerTask('default', ['clean'])
}
