var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;


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