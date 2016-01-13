// Include gulp
var gulp = require('gulp');

// Include packages
var less = require('gulp-less');
var path = require('path');

// Less Task
gulp.task('less', function() {
  return gulp.src('./assets/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./assets/css'));
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('./assets/less/*.less', ['less']);
});

// Default Task
// gulp.task('default', ['less']);
