var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var injector_defaults = {
  starttag: '<!-- injector:{{ext}} -->',
  endtag: '<!-- endinjector -->',
  ignorePath: ['client', '.tmp'],
  addRootSlash: false
};

gulp.task('inject:js', function () {
  return gulp.src('client/index.html')
    .pipe($.inject(gulp.src('./client/**/*.js',{read:false}), injector_defaults))
    .pipe(gulp.dest('client'));
});

gulp.task('inject:css', function () {
  return gulp.src('client/index.html')
    .pipe($.inject(gulp.src('.tmp/**/*.css', {read:false}), injector_defaults))
    .pipe(gulp.dest('client'));
});

gulp.task('inject:bower', function () {
  return gulp.src('client/index.html')
    .pipe($.inject($.bowerFiles(), {
        starttag: '<!-- bower:{{ext}} -->',
        endtag: '<!-- endbower -->',
      }))
    .pipe(gulp.dest('client'));
});

gulp.task('less', function () {
  return gulp.src('./client/**/*.less')
    .pipe($.less({
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