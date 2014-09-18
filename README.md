grunt-init-sopro-component
===========

This grunt init script builds a scaffold for a Society Pro Component.

Usage
-----
Be in Git Bash so ~ works:

    $ git clone https://github.com/sopro-components/grunt-init-sopro-component.git ~/.grunt-init/sopro-component
    $ npm install -g grunt grunt-init
    $ cd my-sweet-component
    $ grunt-init sopro-component
    $ cd src
    $ npm install
    
What it does
------------

0. Check for non-empty directory and warn of overwrites
1. Prompt:
  * component name
  * repo (default to sopro-components/*)
  * wanna autocompile jade and sass?
  * wanna add sopro-material?
  * wanna add japi?
  * wanna add Roboto, angular, angular-material, angular-animate?
  * wanna add jquery?
2. Generate custom Gruntfile
3. Copy custom Gruntfile
4. Copy template skeleton
5. Tell the user to run the new Gruntfile for bower