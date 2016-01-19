// TODO: 
// image optimization
// JS minify and lint
// combine with roots/sage???
//

var gulp         = require('gulp');
var gutil        = require('gulp-util');
var notify       = require('gulp-notify');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var livereload   = require('gulp-livereload');

//var exec = require('child_process').exec;
//var sys = require('sys');

// Where do you store your Sass files?
var sassDir = 'assets/scss';

// Which directory should LESS compile to?
var targetCSSDir = 'assets/css';


// Which directory should CoffeeScript compile to?
var targetJSDir = 'assets/js';


// Compile CSS for dev
gulp.task('dev', function () {
  return gulp.src(sassDir + '/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(targetCSSDir))
    .pipe(livereload())
    .pipe(notify('CSS Compiled. Page RELOADED'));
});

// Compile LESS and Minify CSS for production
gulp.task('build', function () {
  return gulp.src(sassDir + '/main.scss')
    .pipe(sourcemaps.init() )
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(targetCSSDir) )
    .pipe(notify('CSS compiled and minified for PRODUCTION') );
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
  gulp.watch(sassDir + '/*.scss', ['dev']);
  //gulp.watch('app/**/*.php', ['phpunit']);
});

// Gulp Default
gulp.task('default', ['dev']);
