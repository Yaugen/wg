"use strict";
var gulp = require('gulp'),
    server = require('gulp-server-livereload'),
    rename = require('gulp-rename'),
    // browserify = require('gulp-browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass');

gulp.task('server', function() {
    gulp.src('./')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function(filePath, cb) {
                    gutil.log(gutil, filePath);
                    cb( !(/build/.test(filePath)));
                }
            },
            open: true,
        }));
});

gulp.task('watch', function() {
    // gulp.watch('app/scripts/**.*', ['build']);
    gulp.watch('app/styles/*.scss', ['sass']);
});

gulp.task('sass', function() {
    gulp.src('./app/styles/**.scss')
        .pipe(sass())
        .on('error', gutil.log.bind(gutil, 'Sass Error'))
        .pipe(gulp.dest('./build'));
});


gulp.task('build', function() {
  var bundler = watchify(browserify('./app/scripts/app.jsx', watchify.args));

  // bundler.transform('reactify', {es6: true});
  bundler.transform(babelify);
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);

  bundle();

  function bundle() {
    bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build'));
  }
});

gulp.task('default', ['watch', 'build', 'sass', 'server']);

