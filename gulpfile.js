'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var fs = require('fs');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var cfg = require('./package.json');

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getBundleName() {
  return cfg.name + '-' + cfg.version;
};

gulp.task('clean', function () {
  return gulp.src('dist', { read: false }).pipe($.clean());
});

var browserifyConfig = {
  entries: ['./index.js'],
  debug: true,
  standalone: capitalise(cfg.name),
  external: ['lodash', 'react', 'baconjs'],
  bundleExternal: false,
};

gulp.task('build', function () {
  var bundler = browserify(browserifyConfig);

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
  var bundler = browserify(browserifyConfig);

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
