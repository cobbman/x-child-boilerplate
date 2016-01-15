var gulp         = require('gulp');
var gutil        = require('gulp-util');
var notify       = require('gulp-notify');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssnano      = require('gulp-cssnano');
var sourcemaps   = require('gulp-sourcemaps');
var livereload   = require('gulp-livereload');

//var exec = require('child_process').exec;
//var sys = require('sys');

// Where do you store your Sass files?
var lessDir = 'assets/less';

// Which directory should LESS compile to?
var targetCSSDir = 'assets/css';


// Which directory should CoffeeScript compile to?
var targetJSDir = 'assets/js';


// Compile LESS for dev
gulp.task('css', function () {
  return gulp.src(lessDir + '/main.less')
		.pipe( less() ).on( 'error', gutil.log )
    .pipe( gulp.dest(targetCSSDir) )
    .pipe( notify('LESS Files built and Page Reloaded') )
    .pipe( livereload() );
});

// Compile LESS and Minify CSS for production
gulp.task('build', function () {
  return gulp.src(lessDir + '/main.less')
		.pipe( sourcemaps.init() )
		.pipe( less() ).on( 'error', gutil.log )
    .pipe( cssnano() ).on( 'error', gutil.log )
  //   .pipe(autoprefixer({
		// 	browsers: ['last 2 versions'],
		// 	cascade: true
		// }))
		.pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(targetCSSDir) )
    .pipe( notify('Less files compiled and MINIFIED for Production') )
    .pipe( livereload() );
});


// Run all PHPUnit tests
//gulp.task('phpunit', function() {
//    exec('phpunit', function(error, stdout) {
//        sys.puts(stdout);
//    });
//});

// Keep an eye on Sass, Coffee, and PHP files for changes...
gulp.task('watch', function () {
	livereload.listen();
  gulp.watch(lessDir + '/*.less', ['css']);
  //gulp.watch('app/**/*.php', ['phpunit']);
});

// What tasks does running gulp trigger?
gulp.task('default', ['css']);