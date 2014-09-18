/*
 * grunt-init-sopro-component
 * https://github.com/sopro-components/grunt-init-sopro-component
 *
 * Copyright (c) 2014 Central Services Inc.
 */

'use strict';

var path = require('path');

// Basic template description.
exports.description = 'Create a Society Pro Component.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template overwrites component and src folders, and .gitignore.'
+ ' It generates package.json and bower.json files in src/';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

exports.template = function(grunt, init, done) {
  // Start the interactive configuration process:
  init.process(
    // Options object:
    {}
    // Prompts array:
    ,[
      // Invoke built in prompts:
      init.prompt('name'),
      init.prompt('title'),
      init.prompt('description'),
      {
        name: 'repository',
        message: 'What repository url?',
        // This default function ripped from https://raw.githubusercontent.com/gruntjs/grunt-init/master/tasks/init.js
        default: function(value, data, done) {
          var types = ['javascript', 'js'];
          if (data.type) { types.push(data.type); }
          var type = '(?:' + types.join('|') + ')';
          // This regexp matches:
          //   leading type- type. type_
          //   trailing -type .type _type and/or -js .js _js
          var re = new RegExp('^' + type + '[\\-\\._]?|(?:[\\-\\._]?' + type + ')?(?:[\\-\\._]?js)?$', 'ig');
          // Strip the above stuff from the current dirname.
          var name = path.basename(process.cwd()).replace(re, '');
          // Remove anything not a letter, number, dash, dot or underscore.
          name = name.replace(/[^\w\-\.]/g, '');
          // Prepend our git repo path.
          name = "https://github.com/sopro-components/" + name + ".git";
          done(null, name);
        },
      },
      init.prompt('version'),
      // Invoke custom prompts:
      {
        name: 'autocompileJade',
        message: 'Will you be compiling jade html?',
        default: 'no',
        warning: ''
      },
      {
        name: 'autocompileSass',
        message: 'Will you be compiling sass to css? (Warning, you need ruby)',
        default: 'no',
        warning: ''
      },
      {
        name: 'soproMaterial',
        message: 'Want sopro-material?',
        default: 'yes',
        warning: 'SoPro\'s components, styles and scripts',
      },
      {
        name: 'japi',
        message: 'Want japi?',
        default: 'no',
        warning: 'SoPro\'s javascript API'
      },
      {
        name: 'jquery',
        message: 'Want jquery? What version?',
        default: '2.x',
      },
      {
        name: 'roboto',
        message: 'Want Roboto fonts?',
        default: 'yes',
      },
    ]
    // Callback argument, to be invoked after all prompts:
    , function(err, props){
      // props is a dictionary of the user's responses

      if(err){console.log(err);}

      // Pick a name suitable for angular directives based on props.name:
      var n = props.name;
      while(/\-/.test(n)){              // while a dash still appears in n:
        var i = n.indexOf('-');         // find the leftmost dash
        n[i+1] = n[i+1].toUpperCase();  // camelcase whatever's after the dash
        var left = n.slice(0, i);       // take everything before the dash
        var right = n.slice(i+1);       // and everything after the dash
        n = left.concat(right);         // and set n to that
      }                                 // repeat
      props.ngName = n;

      props.autocompileJade = /y/i.test(props.autocompileJade);
      props.autocompileSass = /y/i.test(props.autocompileSass);
      props.soproMaterial = /y/i.test(props.soproMaterial);

      props.japi = /y/i.test(props.japi);
      props.roboto = /y/i.test(props.roboto);

      // No valid jquery versions start with n. Assume 'no jquery'
      var noJquery = /^n/i.test(props.jquery);
   
      // Files to copy (and process).
      var files = init.filesToCopy(props);
      // Actually copy (and process) files.
      init.copyAndProcess(files, props);

      // Craft src/package.json
      var bowerDeps = {};
      var bowerDDeps = {};
      var npmDeps = {};
      var npmDDeps = {};

      npmDDeps['grunt'] = '~0.4.5';
      npmDDeps['grunt-bower-task'] = "^0.4.0";

      if(props.autocompileJade){
        npmDDeps['grunt-contrib-watch'] = '~0.6.1';
        npmDDeps['grunt-contrib-jade'] = '~0.12.0';
      }
      if(props.autocompileSass){
        npmDDeps['grunt-contrib-watch'] = '~0.6.1';
        npmDDeps['grunt-contrib-sass'] = '~0.8.1';
      }

      if (props.soproMaterial) {
        bowerDeps["sopro-material"] = "https://github.com/sopro-components/sopro-material.git#0.1.2";
      }
      if (props.japi) {
        bowerDeps["japi"] = "https://github.com/SocietyPro/japi.git#0.1.0";
      }
      if (!noJquery) {
        bowerDeps['jquery'] = props.jquery;
      }
      if (props.roboto) {
        bowerDeps["roboto"] = "https://github.com/sopro-components/roboto.git#0.1.0";
      }

      // Generate package.json file, used by npm and grunt.
      init.writePackageJSON('src/package.json', {
        author: "Central Services Inc",
        scripts: {
          postinstall: "grunt",
        },
        name: props.name,
        version: props.version,
        description: props.description,
        node_version: '>= 0.10.0',
        devDependencies: npmDDeps,
        dependencies: npmDeps,
      });

      // Generate bower.json file
      init.writePackageJSON('src/bower.json', {
        author: "Central Services Inc",
        name: props.name,
        version: props.version,
        description: props.description,
        devDependencies: bowerDDeps,
        dependencies: bowerDeps,
      });

      grunt.log.writeln('');
      grunt.log.writeln('');
      grunt.log.oklns('bower.json, package.json, Gruntfile.js were generated for '+props.name+'.')
      grunt.log.writeln('Now, run your new scripts with:');
      grunt.log.subhead('  cd src; npm install');

      // All done!
      done();
    } // end init.process callback
  ) // end init.process invocation
};