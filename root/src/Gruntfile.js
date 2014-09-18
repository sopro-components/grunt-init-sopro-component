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
      if(autocompileSass){
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
  if(autocompileJade || autocompileSass){
  %}
  grunt.loadNpmTasks('grunt-contrib-watch');
  {%
  };
  %}

  {% 
  if(autocompileJade){
  %}
  grunt.loadNpmTasks('grunt-contrib-jade');
  {%
  };
  %}

  {% 
  if(autocompileSass){
  %}
  grunt.loadNpmTasks('grunt-contrib-sass');
  {%
  };
  %}

  // Default task.
  grunt.registerTask('default', [
    'bower:install',

    {% 
    if(autocompileJade){
    %}
    'jade:compile',
    'watch:jade',
    {%
    };
    %}

    {% 
    if(autocompileSass){
    %}
    'sass:compile',
    'watch:sass',
    {%
    };
    %}
  
  ]);

};