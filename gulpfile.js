'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var fs = require('fs');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var cfg = require('./package.json');

var getBundleName = function () {
  return cfg.name + '-' + cfg.version;
};

gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe($.clean());
});

gulp.task('build', function () {
  var bundler = browserify({
    entries: ['./index.js'],
    debug: true,
    standalone: cfg.name
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  return bundle();
});

gulp.task('build:minified', function () {
  var bundler = browserify({
    entries: ['./index.js'],
    debug: true,
    standalone: cfg.name
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.min.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  return bundle();
});

gulp.task('default', ['build', 'build:minified']);
