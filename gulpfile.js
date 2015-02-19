'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var fs = require('fs');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var getBundleName = function () {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe($.clean());
});

gulp.task('build', function () {
  var bundler = browserify({
    entries: ['./index.js'],
    debug: true
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/amd/'));
  };

  return bundle();
});

gulp.task('default', ['build']);
