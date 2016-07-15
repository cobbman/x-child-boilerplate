# X - Child Boilerplate
Author: William <william@d3fy.com>

### Requirements
Must run alongside parent theme 'X' - purchase license on Themeforest

### Dependencies
- Node.js - [https://nodejs.org/en/]()
- LiveReload Browser Plugin - [https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)


### Setting up

In your terminal, run:

	1. npm install
	2. gulp watch
	3. gulp build (to minify assets)

Currently need *live reload* plugin for your browser for css injection to work [https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)

When it is time to launch, run `gulp build` and your assets will be minified for you

### Helper Classes
This theme automatically generates some helper classes for you. To use them, first set your $mainColors array map in **assets/scss/common/_variables.scss**. Then you can use things like this in your theme:

`<section class="text-white bg-blue"> blah blah blah </section>`

You can also control your *button styles* this way:

`<button class="x-btn solid-red hover-green">I'm a button!</button>`
