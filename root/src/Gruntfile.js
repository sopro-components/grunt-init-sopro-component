/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    watch: {
      {% 
      if(autocompileJade){
      %}
      jade: {
        files: ['jade/*'],
        tasks: ['jade:compile']
      },
      {%
      };
      %}

      {% 
      if(compileSass){
      %}
      sass: {
        files: ['sass/*'],
        tasks: ['sass:compile']
      }
      {%
      };
      %}
    },
    bower: {
      install: {
        options:{
          targetDir: '../component/bower_components',
          layout: 'byComponent',
          copy: false,
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
  if(autocompileJade || compileSass){
  %}
  grunt.loadNpmTasks('grunt-contrib-watch');
  {%
  };
  %}

  grunt.loadNpmTasks('grunt-contrib-jade');

  {% 
  if(compileSass){
  %}
  grunt.loadNpmTasks('grunt-contrib-sass');
  {%
  };
  %}

  // Default task.
  grunt.registerTask('default', [
    'bower:install',
    'jade:compile',

    {% 
    if(autocompileJade){
    %}
    'watch:jade',
    {%
    };
    %}

    {% 
    if(compileSass){
    %}
    'sass:compile',
    'watch:sass',
    {%
    };
    %}
  
  ]);

};