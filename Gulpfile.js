var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  return gulp.src('./client/**/*.less')
    .pipe(less({
      paths: [ 'client', 'bower_components' ]
    }))
    .pipe(gulp.dest('.tmp'));
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['client', '.tmp', 'node_modules'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});


gulp.task('default', function() {
  
});