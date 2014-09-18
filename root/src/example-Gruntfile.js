/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    watch: {
      jade: {
        files: ['jade/*'],
        tasks: ['jade:compile']
      }
    },
    /*
    */
    bower: {
      install: {
        options:{
          targetDir: '../component/bower_components',
          layout: 'byComponent',
          copy: true,
          cleanTargetDir: true,
          verbose: true,
        }
      },
    },
    jade: {
      compile: {
        options: {client: false, pretty: true},
        files: [
          {
            cwd: 'jade',
            src: '*.jade',
            dest: '../component',
            expand: true,
            ext: '.html'
          },
        ],
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task.
  grunt.registerTask('default', [
    'bower:install',
    'jade:compile',
    'watch:jade'
  ]);

};