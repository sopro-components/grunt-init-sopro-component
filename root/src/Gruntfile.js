/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    {% 
    if(autocompile){
    %}
      watch: {
        jade: {
          files: ['jade/*'],
          tasks: ['jade:compile']
        },
        sass: {
          files: ['sass/*'],
          tasks: ['sass:compile']
        }
      },
    {%
    };
    %}
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
    sass: {
      compile: {
        options: {
          style: "expanded",
          pretty: true
        },
        files: [
          {
            cwd: 'sass',
            src: '*.sass',
            dest: '../component',
            expand: true,
            ext: '.css'
          },
        ],
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-bower-task');
  {% 
  if(autocompile){
  %}
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
  {%
  };
  %}

  // Default task.
  grunt.registerTask('default', [
    'bower:install',
    {% 
    if(autocompile){
    %}
      'jade:compile',
      'sass:compile',
      'watch:jade',
      'watch:sass',
    {%
    };
    %}
  ]);

};