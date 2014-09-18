/*
 * grunt-init-sopro-component
 * https://github.com/sopro-components/grunt-init-sopro-component
 *
 * Copyright (c) 2014 Central Services Inc.
 */

'use strict';

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
      init.prompt('repository'),
      init.prompt('version'),
      // Invoke custom prompts:
      {
        name: 'autocompile',
        message: 'Want to watch jade and sass and autocompile them?',
        default: 'Y/n',
        warning: ''
      },
      {
        name: 'soproMaterial',
        message: 'Want sopro-material?',
        default: 'Y/n',
        warning: 'SoPro\'s components, styles and scripts',
      },
      {
        name: 'japi',
        message: 'Want japi?',
        default: 'Y/n',
        warning: 'SoPro\'s javascript API'
      },
      {
        name: 'jquery',
        message: 'Want jquery?',
        default: '2.x',
      },
      {
        name: 'roboto',
        message: 'Want Roboto fonts?',
        default: 'Y/n',
      },
    ]
    // Callback argument, to be invoked after all prompts:
    , function(err, props){
      if(err){console.log(err);}
      props.autocompile = /y/i.test(props.autocompile);
      props.soproMaterial = /y/i.test(props.soproMaterial);
      props.japi = /y/i.test(props.japi);
      props.roboto = /y/i.test(props.roboto);
   
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

      if(props.autocompile){
        npmDDeps['grunt-contrib-watch'] = '~0.6.1';
        npmDDeps['grunt-contrib-sass'] = '~0.8.1';
        npmDDeps['grunt-contrib-jade'] = '~0.12.0';
      }

      if (props.soproMaterial) {
        bowerDeps['sopro-components/sopro-material'] = '0.1.0';
      }
      if (props.japi) {
        bowerDeps['SocietyPro/japi'] = '*';
      }
      if (props.jquery) {
        bowerDeps['jquery'] = props.jquery;
      }
      if (props.roboto) {
        bowerDeps['sopro-components/roboto'] = '*';
      }

      // Generate package.json file, used by npm and grunt.
      init.writePackageJSON('src/package.json', {
        author: "Central Services Inc",
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

      // All done!
      done();
    } // end init.process callback
  ) // end init.process invocation
};