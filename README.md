# Init Angular
This repo is a skeleton for making new projects.

run npm install

run grunt

open dist/index.html


### File Structure
* dist - used for compiling src code
* grunt
	* task - each grunt task has it's own folder
		* task.js
* lib - used for storing main external libraries before concatenation
* node_modules - used for npm installed dependencies
* src
	* external - extra libraries and such
	* fonts - custom fonts
	* html - for iframes and such
	* img - store images
	* jade
		* index.jade - main file
		* mixins.jade - mixins
	* js
		* services
			* mc.js - common Moritz Company functions
			* MethodFactory.js - common app methods
		* app.js
		* main.js
	* less
		* all.less - import all other less files used in app
		* common.less - common Moritz Company helper classes
	* apple-touch-icon.png - 120x120 icon for apple homescreen
	* favicon.ico
* .bowerrc - libraries stored in 'lib' folder
* .gitignore
* .jscsrc - styling formats for js files
* .jshint - options for linting js files
* bower.json - store all main external libraries
* Gruntfile.js - preload all grunt tasks
* package.json - app info and dependencies
* README.md
