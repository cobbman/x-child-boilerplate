// TODO: 
// image optimization
// JS minify and lint
// combine with roots/sage???
//

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
gulp.task('dev', function () {
  return gulp.src(lessDir + '/main.less')
    .pipe( less() ).on( 'error', gutil.log )
    .pipe( gulp.dest(targetCSSDir) )
    .pipe( notify('LESS Compiled for DEV') )
    .pipe( livereload() );
});

// Compile LESS and Minify CSS for production
gulp.task('build', function () {
  return gulp.src(lessDir + '/main.less')
    .pipe( sourcemaps.init() )
    .pipe( less() ).on( 'error', gutil.log )
    .pipe( cssnano() ).on( 'error', gutil.log )
  //   .pipe(autoprefixer({
    //  browsers: ['last 2 versions'],
    //  cascade: true
    // }))
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest(targetCSSDir) )
    .pipe( notify('LESS compiled and minified for PRODUCTION') )
    .pipe( livereload() );
});


// Run all PHPUnit tests
//gulp.task('phpunit', function() {
//    exec('phpunit', function(error, stdout) {
//        sys.puts(stdout);
//    });
//});

// Gulp watch
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(lessDir + '/*.less', ['dev']);
  //gulp.watch('app/**/*.php', ['phpunit']);
});

// Gulp Default
gulp.task('default', ['dev']);
